import { getTemplate } from '../templates';
import logger from '../config/logger';

export class TemplateService {
  static render(templateName: string, data: Record<string, any>): { html: string; text: string } {
    const template = getTemplate(templateName);
    
    if (!template) {
      logger.error(`Template not found: ${templateName}`);
      throw new Error(`Email template '${templateName}' not found`);
    }

    try {
      const html = template.html(data);
      const text = template.text(data);

      return { html, text };
    } catch (error: any) {
      logger.error('Template rendering error', {
        template: templateName,
        error: error.message,
      });
      throw new Error(`Failed to render template '${templateName}': ${error.message}`);
    }
  }

  static stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }
}
