#!/usr/bin/env ts-node

//
// Generate static ICS files from src/events.ts
// Victor-style formatting, no bird-flock nonsense.
//

import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { WEDDING_EVENT, RECEPTION_EVENT } from '../src/events.ts';
import { CalendarEvent                  } from '../src/lib/CalendarEvent.ts';

function info(msg)
{
  console.log(` INFO ->> [refresh-ics] ${msg}`);
}

function abort(msg)
{
  console.error(`\n[refresh-ics] ERROR: ${msg}`);
  process.exit(1);
}

info('Preparing ICS output directory');

const outDir = resolve('public/ics');

mkdirSync(outDir, { recursive: true });

info('Creating CalendarEvent instances');

const weddingEvent   = new CalendarEvent(WEDDING_EVENT);
const receptionEvent = new CalendarEvent(RECEPTION_EVENT);

info('Generating ICS content');

const weddingIcs   = weddingEvent.toIcs();
const receptionIcs = receptionEvent.toIcs();

info('Writing files');

writeFileSync(resolve(outDir, 'wedding.ics'),   weddingIcs,   'utf8');
writeFileSync(resolve(outDir, 'reception.ics'), receptionIcs, 'utf8');

info('ICS refresh complete');

// END