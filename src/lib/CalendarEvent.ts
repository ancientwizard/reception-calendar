// CalendarEvent.ts

export interface EventMeta
{
  title: string;
  description: string[];   // array of lines
  location: string;
  timeZone: string;
  startUtc: string;        // e.g. 20261107T170000Z
  endUtc: string;          // e.g. 20261107T190000Z
  mapsUrl: string;
}

export class CalendarEvent
{
  meta: EventMeta;

  constructor(meta: EventMeta)
  {
    this.meta = meta;
  }

  get heading(): string { return this.meta.title.split(' ').reverse()[0] || 'Event'; }
  get title()  : string { return this.meta.title; }
  get description(): string[] { return this.meta.description; }
  get location(): string { return this.meta.location; }
  get timeZone(): string { return this.meta.timeZone; }
  get startUtc(): string { return this.meta.startUtc; }
  get endUtc()  : string { return this.meta.endUtc; }
  get mapsUrl() : string { return this.meta.mapsUrl; }

  // --- ICS BUILDING ---------------------------------------------------------

  private pad(value: number): string
  {
    return String(value).padStart(2, '0');
  }

  private formatIcsUtc(date: Date): string
  {
    return (
      date.getUTCFullYear().toString() +
      this.pad(date.getUTCMonth() + 1) +
      this.pad(date.getUTCDate()) +
      'T' +
      this.pad(date.getUTCHours()) +
      this.pad(date.getUTCMinutes()) +
      this.pad(date.getUTCSeconds()) +
      'Z'
    );
  }

  private escapeIcsText(value: string): string
  {
    return String(value || '')
      .replace(/\\/g, '\\\\')
      .replace(/\r?\n/g, '\\n')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,');
  }

  private foldIcsLine(line: string): string
  {
    const text = String(line || '');
    if (text.length <= 74) return text;

    const chunks = [];
    for (let i = 0; i < text.length; i += 74)
      chunks.push((i === 0 ? '' : ' ') + text.slice(i, i + 74));

    return chunks.join('\r\n');
  }

  public toIcs(): string
  {
    const e = this.meta;

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//victor-wedding//calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-TIMEZONE:${e.timeZone}`,
      'BEGIN:VEVENT',
      `UID:${encodeURIComponent(e.title)}-${e.startUtc}@victor-wedding`,
      `DTSTAMP:${this.formatIcsUtc(new Date())}`,
      `DTSTART:${e.startUtc}`,
      `DTEND:${e.endUtc}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      `SUMMARY:${this.escapeIcsText(e.title)}`,
      `DESCRIPTION:${this.escapeIcsText(e.description.join('\n'))}`,
      `LOCATION:${this.escapeIcsText(e.location)}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ];

    return lines.map(this.foldIcsLine).join('\r\n');
  }

  // --- ICS DOWNLOAD ---------------------------------------------------------

  public downloadIcs(filename = 'event.ics')
  {
    const blob = new Blob([this.toIcs()], {
      type: 'text/calendar;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // --- GOOGLE CALENDAR URL --------------------------------------------------

  public toGoogleCalendarUrl(): string
  {
    const e = this.meta;

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: e.title,
      details: e.description.join('\n'),
      location: e.location,
      dates: `${e.startUtc.replace('Z', '')}/${e.endUtc.replace('Z', '')}`
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  // --- PRETTY DISPLAY -------------------------------------------------------

  public toDisplay(): string
  {
    return `${this.meta.title}\n${this.meta.description.join('\n')}\n${this.meta.location}`;
  }
}
