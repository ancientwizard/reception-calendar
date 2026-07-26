<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';
import { CalendarEvent } from '@/lib/CalendarEvent';
import { WEDDING_EVENT, RECEPTION_EVENT } from '@/events';
import CalEvent from '@/view/CalEvent.vue';

const weddingEvent   = new CalendarEvent(WEDDING_EVENT);
const receptionEvent = new CalendarEvent(RECEPTION_EVENT);

export default
defineComponent({
  name: 'App',
  components: { CalEvent },

  setup()
  {
    const queryParams = ref<Record<string, string>>({});
    const wedding_event   = weddingEvent;
    const reception_event = receptionEvent;

    //
    // --- ACTIONS --------------------------------------------------------------
    //
    const addWeddingToGoogle = () =>
      window.open(weddingEvent.toGoogleCalendarUrl(), '_blank');

    const addReceptionToGoogle = () =>
      window.open(receptionEvent.toGoogleCalendarUrl(), '_blank');

    const downloadWeddingCalendar = () =>
      weddingEvent.downloadIcs('event-11-07-wedding.ics');

    const downloadReceptionCalendar = () =>
      receptionEvent.downloadIcs('event-11-07-reception.ics');

    //
    // --- AUTO‑ACTION ON MOUNT -------------------------------------------------
    //
    onMounted(() =>
    {
      const url    = new URL(window.location.href);
      const params = Object.fromEntries(url.searchParams.entries());

      queryParams.value = params;

      const googleParam   = url.searchParams.get('add-to-google');
      const downloadParam = url.searchParams.get('download-ics');

      if (googleParam === 'wedding')
      {
        addWeddingToGoogle();
        return;
      }

      if (googleParam === 'reception')
      {
        addReceptionToGoogle();
        return;
      }

      if (downloadParam === 'wedding')
      {
        downloadWeddingCalendar();
        return;
      }

      if (downloadParam === 'reception')
      {
        downloadReceptionCalendar();
        return;
      }
    });

    return {
      showDebug: false,
      queryParams,

      wedding_event,
      reception_event,

      addWeddingToGoogle,
      addReceptionToGoogle,
      downloadWeddingCalendar,
      downloadReceptionCalendar
    };
  }
});

</script>

<template>
  <div class="container py-5">

    <cal-event :event="wedding_event"
        @add-to-google="addWeddingToGoogle"
        @download-calendar="downloadWeddingCalendar"
    />
    <cal-event :event="reception_event"
        @add-to-google="addReceptionToGoogle"
        @download-calendar="downloadReceptionCalendar"
    />

    <div v-if="showDebug">
      <h3 class="mb-3">Query Parameters</h3>
      <pre>{{ queryParams }}</pre>
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

pre
{
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
}

</style>
