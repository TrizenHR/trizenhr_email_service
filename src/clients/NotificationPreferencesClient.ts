import axios, { AxiosInstance } from 'axios';
import logger from '../config/logger';

export type NotificationCategory =
    | 'taskUpdates'
    | 'payments'
    | 'promotions'
    | 'reminders'
    | 'system'
    | 'marketing'
    | 'transactional'
    | 'taskReminders'
    | 'keywordTaskAlerts'
    | 'recommendedTaskAlerts';

/**
 * Client for checking user notification preferences from user-service
 * This should be called before sending any email to respect user preferences
 */
export class NotificationPreferencesClient {
    private static client: AxiosInstance;
    private static userServiceUrl: string;

    /**
     * Initialize the client with user service URL
     */
    static initialize() {
        this.userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:4001';
        this.client = axios.create({
            baseURL: this.userServiceUrl,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        logger.info('NotificationPreferencesClient initialized', {
            userServiceUrl: this.userServiceUrl,
        });
    }

    /**
     * Check if an email notification can be sent to a user for a specific category
     * 
     * @param uid - User ID
     * @param category - Notification category (taskUpdates, payments, etc.)
     * @returns Promise<boolean> - true if email can be sent, false otherwise
     */
    static async canSendEmail(uid: string, category: NotificationCategory): Promise<boolean> {
        if (!this.client) {
            this.initialize();
        }

        try {
            const response = await this.client.get(
                `/api/v1/notification-preferences/${uid}/can-send`,
                {
                    params: {
                        channel: 'email',
                        category,
                    },
                }
            );

            const canSend = response.data?.data?.canSend ?? true; // Default to true if service is unavailable

            logger.info('Checked email notification permission', {
                uid,
                category,
                canSend,
            });

            return canSend;
        } catch (error: any) {
            logger.warn('Failed to check notification preferences, defaulting to allow', {
                uid,
                category,
                error: error.message,
            });
            // On error, default to allowing the email (fail open for critical notifications)
            // This ensures emails are sent even if the user-service is temporarily unavailable
            return true;
        }
    }

    /**
     * Check if emails can be sent to multiple users for a specific category
     * Returns a map of uid -> canSend
     */
    static async canSendEmailBatch(
        uids: string[],
        category: NotificationCategory
    ): Promise<Map<string, boolean>> {
        if (!this.client) {
            this.initialize();
        }

        const results = new Map<string, boolean>();

        try {
            const response = await this.client.post(
                `/api/v1/notification-preferences/can-send-batch`,
                {
                    uids,
                    channel: 'email',
                    category,
                }
            );

            const batchResults = response.data?.data?.results ?? {};

            // Populate results map
            uids.forEach((uid) => {
                results.set(uid, batchResults[uid] ?? true); // Default to true if not in response
            });

            logger.info('Checked batch email notification permissions', {
                totalUsers: uids.length,
                category,
                allowedCount: Array.from(results.values()).filter((v) => v).length,
            });

            return results;
        } catch (error: any) {
            logger.warn('Failed to check batch notification preferences, defaulting to allow all', {
                totalUsers: uids.length,
                category,
                error: error.message,
            });

            // On error, default to allowing all emails
            uids.forEach((uid) => results.set(uid, true));
            return results;
        }
    }

    /**
     * Filter a list of user IDs to only those who can receive emails for a category
     */
    static async filterUsersForEmail(
        uids: string[],
        category: NotificationCategory
    ): Promise<string[]> {
        const results = await this.canSendEmailBatch(uids, category);
        return uids.filter((uid) => results.get(uid) === true);
    }
}

export default NotificationPreferencesClient;
