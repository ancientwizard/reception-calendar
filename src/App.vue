<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';
import { CalendarEvent } from '@/lib/CalendarEvent';
import { WEDDING_EVENT, RECEPTION_EVENT } from '@/events';

const weddingEvent   = new CalendarEvent(WEDDING_EVENT);
const receptionEvent = new CalendarEvent(RECEPTION_EVENT);

export default
defineComponent({
  name: 'App',

  setup()
  {
    const queryParams = ref<Record<string, string>>({});
    const bobParam    = ref<string | null>(null);

    onMounted(() =>
    {
      const url    = new URL(window.location.href);
      const params = Object.fromEntries(url.searchParams.entries());

      queryParams.value = params;
      bobParam.value    = url.searchParams.get('bob');
    });

    return {
      showDebug: false,
      queryParams,
      bobParam,

      wedding_event:   WEDDING_EVENT,
      reception_event: RECEPTION_EVENT,

      downloadWeddingCalendar:   () => weddingEvent.downloadIcs('11-07-wedding.ics'),
      downloadReceptionCalendar: () => receptionEvent.downloadIcs('11-07-reception.ics'),
      addWeddingToGoogle:        () => window.open(weddingEvent.toGoogleCalendarUrl(), '_blank'),
      addReceptionToGoogle:      () => window.open(receptionEvent.toGoogleCalendarUrl(), '_blank')
    };
  }
});

</script>

<template>
  <div class="container py-5">

    <div class="hero card card-limit-w border-0 shadow-lg overflow-hidden mb-3">
      <div class="card-body p-3">

        <!-- WEDDING -->
        <div class="eyebrow text-uppercase fw-semibold h2">
          Wedding Event
        </div>

        <div class="border-bottom mb-3 border-primary">
          <div class="text-dark ms-3 mb-3">

            Welcome to
            {{ wedding_event.description[0] }}<br>
            {{ wedding_event.description[1] }}<br>
            {{ wedding_event.location }}<br>

            <a class="btn btn-primary btn-sm ms-2 float-end shadow"
               href="https://maps.app.goo.gl/Po3sNKkJC1zXAiaB8"
               target="_blank">
              Open in Maps
            </a>

            <br><span class="badge border border-success text-dark">{{ wedding_event.description[2] }}</span><br>

            <div class="row g-2 mt-1">

              <div class="col-12 col-md-auto">
                <button class="btn btn-success btn-sm calendar-cta shadow w-100"
                        @click="addWeddingToGoogle">
                  <svg class="icon me-1" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                  </svg>
                  Add to Google Calendar
                </button>
              </div>

              <div class="col-12 col-md-auto">
                <button class="btn btn-success btn-sm calendar-cta shadow w-100"
                        @click="downloadWeddingCalendar">
                  <svg class="icon me-1" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                  </svg>
                  Add to calendar app as .ics file
                </button>

                <!-- <a class="btn btn-success btn-sm calendar-cta shadow w-100" href="ics/wedding.ics" type="text/calendar">
                  <svg class="icon me-1" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                  </svg>
                  Add to calendar app as .ics file
                </a> -->
              </div>

            </div>
          </div>
        </div>

        <!-- WEDDING -->
        <div class="eyebrow text-uppercase fw-semibold h2">
          Reception Event
        </div>

        <!-- Reception -->
        <div>
          <div class="text-dark ms-3 mb-3">

            Welcome to
            {{ reception_event.description[0] }}<br>
            {{ reception_event.description[1] }}<br>
            {{ reception_event.location }}<br>

            <a class="btn btn-primary btn-sm float-end shadow"
               href="https://maps.app.goo.gl/y8TJMNEMouCUCTxg9"
               target="_blank">
              Open in Maps
            </a>

            <br><span class="badge bg-danger">{{ reception_event.description[2] }}</span><br>

            <div class="row g-2 mt-1">

              <div class="col-12 col-md-auto">
                <button class="btn btn-warning btn-sm calendar-cta shadow w-100"
                        @click="addReceptionToGoogle">
                  <svg class="icon me-1" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                  </svg>
                  Add to Google Calendar
                </button>
              </div>

              <div class="col-12 col-md-auto">
                <button class="btn btn-warning btn-sm calendar-cta shadow w-100"
                        @click="downloadReceptionCalendar">
                  <svg class="icon me-1" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c1.11 0 2-.89 2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                  </svg>
                  Add to calendar app as .ics file
                </button>

                <!-- <a class="btn btn-warning btn-sm calendar-cta shadow w-100" href="ics/reception.ics" type="text/calendar">
                  <svg class="icon me-1" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                  </svg>
                  Add to calendar app as .ics file
                </a> -->
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-if="showDebug">
      <h3 class="mb-3">Query Parameters</h3>
      <pre>{{ queryParams }}</pre>

      <h3 class="mt-4">Specific Param: "bob"</h3>
      <p v-if="bobParam">Value: <strong>{{ bobParam }}</strong></p>
      <p v-else>No "bob" parameter was provided.</p>
    </div>

  </div>
</template>

<!-- GLOBAL STYLES (must NOT be scoped) -->
<style>

:root
{
  --ink:       #1b2430;
  --panel:     rgba(255, 255, 255, 0.86);
  --accent-a:  #0f766e;
  --accent-c:  #1d4ed8;
}

body
{
  min-height: 100vh;
  color: var(--ink);

  background:
    radial-gradient(circle at top left,  rgba(15, 118, 110, 0.20), transparent 32%),
    radial-gradient(circle at top right, rgba(249, 115, 22, 0.18), transparent 30%),
    linear-gradient(135deg, #f4fbf9 0%, #fff8f2 45%, #eef4ff 100%);
}

</style>

<!-- COMPONENT-SCOPED STYLES -->
<style scoped>

.card-limit-w
{
  max-width: 550px;
  min-width: 400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.icon
{
  width: 1.25em;
  height: 1.25em;
  fill: currentColor;
}

.hero
{
  background: var(--panel);
  backdrop-filter: blur(18px);
}

.eyebrow
{
  letter-spacing: 0.24em;
  color: var(--accent-a);
}

.calendar-cta
{
  vertical-align: middle;
}

pre
{
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
}

</style>
