
<template>
<div>

  <div class="hero card card-limit-w border-0 shadow-lg overflow-hidden mb-3">
    <div class="card-body p-3">

      <!-- EVENT HEADING -->
      <div class="eyebrow text-uppercase fw-semibold h2">
        {{  heading  }}
      </div>

      <div class="text-dark">

        <div>Welcome to
        {{ event.description[0] }}</div>
        <div>{{ event.description[1] }}</div>
        <div>{{ event.location }}</div>

        <a class="btn btn-primary btn-sm ms-2 float-end shadow"
             :href="event.mapsUrl"
             target="_blank">
            Open in Maps
        </a>

        <span :class="classy_note">{{ event.description[2] }}</span>

        <div class="row g-2 mt-1">

          <div class="col-12 col-md-auto">
              <button :class="classy_btn"
                      @click="downloadCalendar()">
                <svg class="icon me-1" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                </svg>
                Add to calendar (.ics file)
              </button>

              <!-- <a class="btn btn-success btn-sm calendar-cta shadow w-100" href="ics/wedding.ics" type="text/calendar">
                <svg class="icon me-1" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                </svg>
                Add to calendar (.ics file)
              </a> -->
           </div>

          <div v-if="showGoogleCalendar" class="col-12 col-md-auto">
              <button :class="classy_btn"
                        @click="addToGoogle()">
                <svg class="icon me-1" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/>
                </svg>
                Add to Google Calendar
              </button>
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

<script lang="ts">

import { CalendarEvent } from '../lib/CalendarEvent.ts';

export default
{
    name: 'CalEvent',
    components: {},
    props: {
        event: { type: CalendarEvent, required: true }
    },

    data: () => ({
        showDebug: false,
        showGoogleCalendar: false,
        queryParams: {},
        bobParam: null,
    }),

    computed:
    {
        heading(): string { return this.event.heading },

        isWedding()
        {
            return this.event.title.toLowerCase()
                .split(' ').includes('wedding')
        },

        classy_note(): string[]
        {
          return this.isWedding
            ? ['badge', 'bg-success', 'text-light', 'pb-2', 'mt-1']
            : ['badge', 'bg-danger', 'pb-2', 'mt-1']
        },

        classy_btn(): string[]
        {
          return this.isWedding
            ? ['btn', 'btn-success', 'btn-sm', 'calendar-cta', 'shadow', 'w-100']
            : ['btn', 'btn-warning', 'btn-sm', 'calendar-cta', 'shadow', 'w-100']
        }
    },

    methods:
    {
        addToGoogle(): void
        {
            // kick this event to parent as new event
            this.$emit('add-to-google', this.isWedding ? 'wedding' : 'reception' );
        },

        downloadCalendar(): void
        {
            // kick this event to parent as new event
            this.$emit('download-calendar', this.isWedding ? 'wedding' : 'reception' );
        }
    }
}
</script>

<style scoped>

.card-limit-w
{
  max-width: 500px;
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
