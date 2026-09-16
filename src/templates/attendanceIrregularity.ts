import { EmailTemplate } from '../types';

interface AttendanceIrregularityData {
  employeeName: string;
  employeeEmail?: string;
  organizationName?: string;
  date: string;
  status: string;
  details?: Record<string, string | number | undefined>;
  platformName?: string;
}

function label(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export const attendanceIrregularityTemplate: EmailTemplate = {
  name: 'attendance_irregularity',
  subject: (data: AttendanceIrregularityData) =>
    `Attendance irregularity: ${data.employeeName} - ${label(data.status)}`,
  html: (data: AttendanceIrregularityData) => {
    const details = Object.entries(data.details || {})
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;">${label(key)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-weight:600;">${value}</td></tr>`)
      .join('');
    return `<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#1f2937;"><div style="background:#b42318;color:#fff;padding:24px;"><h1 style="margin:0;font-size:22px;">Attendance irregularity detected</h1><p style="margin:8px 0 0;">${data.organizationName || data.platformName || 'TrizenHR'}</p></div><div style="padding:24px;background:#fff;"><p><strong>Employee:</strong> ${data.employeeName}${data.employeeEmail ? ` (${data.employeeEmail})` : ''}</p><p><strong>Date:</strong> ${data.date}</p><p><strong>Irregularity:</strong> ${label(data.status)}</p><table style="width:100%;border-collapse:collapse;margin-top:20px;">${details}</table></div></div>`;
  },
  text: (data: AttendanceIrregularityData) => {
    const details = Object.entries(data.details || {})
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${label(key)}: ${value}`)
      .join('\n');
    return `Attendance irregularity detected\n\nEmployee: ${data.employeeName}${data.employeeEmail ? ` (${data.employeeEmail})` : ''}\nDate: ${data.date}\nIrregularity: ${label(data.status)}\n${details}`;
  },
};