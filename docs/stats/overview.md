---
layout: post
title: "Run Stats"
desc: "Stats pertaining to run times"
cover: "/assets/overview-cover.jpg"
permalink: /stats
main_nav: true
---

<head>
  <script src="/js/main.js" defer></script>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js" defer></script>
  <script src="https://unpkg.com/jquery@3.6.0/dist/jquery.slim.min.js" defer></script>
  <script src="/js/stats/charts.js" defer></script>

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<!-- Overview stats -->
<div class="parent">
  <div class="flex-container-stats">
    <p style="text-align: center; font-size: 32px">Overview</p>

  </div>
</div>
<div class="parent">
  <div class="flex-container-stats">
    <nav class="stat-card-flex-slim">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Attempts</p>
          <h2><span id="num_of_attempts"></span></h2>

        </div>
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Best Time</p>
          <h2> <span id="best_time"></span></h2>
        </div>
        <div class="stat-card__icon stat-card__icon--success">
          <div class="stat-card__icon-medal stat-card__icon-circle">
            <i class="fa-solid fa-medal"></i>
          </div>
        </div>
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Last Time</p>
          <h2> <span id="last_time"></span></h2>
        </div>
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Standard Deviation</p>
          <h2><span id="standard_deviation"></span></h2>

        </div>
      </div>
    </nav>

  </div>
</div>

<br>

<!-- Average Times -->
<div class="parent">
  <div class="flex-container-stats">
    <nav class="stat-card-flex">
      <div class="stat-card-trend stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Average Time</p>
          <h2> <span id="average_time"></span></h2>
          <div>
            <div id="average_time_delta_div">
              <div id="average_time_delta_arrow"></div> <span id="average_time_delta"></span>
            </div>
            <span class="text-muted-small">after last run</span>
          </div>
        </div>
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card-trend stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Average Time - Last 5 Runs</p>
          <h2> <span id="average_time_last_five"></span></h2>
          <div>
            <div id="average_time_delta_last_five_div">
              <div id="average_time_delta_last_five_arrow"></div> <span id="average_time_delta_last_five"></span>
            </div>
            <span class="text-muted-small">after last run</span>
          </div>
        </div>
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card-trend stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Ultros Average Time</p>
          <h2> <span id="average_time_ultros"></span></h2>
          <div>
            <div id="average_time_delta_ultros_div">
              <div id="average_time_delta_ultros_arrow"></div> <span id="average_time_delta_ultros"></span>
            </div>
            <span class="text-muted-small">after last Ultros run</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</div>

<br>

<div class="parent">
  <div class="flex-container-stats">
    <p style="text-align: center; font-size: 18px">Skip Stats</p>
  </div>
</div>
<div class="parent">
  <div class="flex-container-stats">
    <nav class="stat-card-flex-slim">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Skip Rate</p>
          <h2> <span id="skip_rate"></span></h2>
        </div>
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card-trend stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Average Time - Skip</p>
          <h2> <span id="average_time_skip"></span></h2>
          <div>
            <div id="average_time_delta_skip_div">
              <div id="average_time_delta_skip_arrow"></div> <span id="average_time_delta_skip"></span>
            </div>
            <span class="text-muted-small">after last run with skip</span>
          </div>
        </div>
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card-trend stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Average Time - No Skip</p>
          <h2> <span id="average_time_no_skip"></span></h2>
          <div>
            <div id="average_time_delta_no_skip_div">
              <div id="average_time_delta_no_skip_arrow"></div> <span id="average_time_delta_no_skip"></span>
            </div>
            <span class="text-muted-small">after last run without skip</span>
          </div>
        </div>
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Time Difference</p>
          <h2><span id="skip_diff"></span></h2>

        </div>
      </div>
    </nav>

  </div>
</div>

<br>
<div class="flex-container-stats">
  <p style="text-align: center; font-size: 28px">Time Breakdown</p>
</div>

<div class="flex-container-stats">
  <p style="text-align: center; font-size: 18px">Run Times</p>
</div>

<!-- Run times line chart -->
<div class="parent">
  <div class="flex-container-stats">
    <nav class="charts">
      <div class="chart">
        <div id="run_times_chart_div"></div>
        <p style="text-align: center; font-size: 12px">*Red data points indicate runs where the skip is used.</p>

      </div>
    </nav>

  </div>

</div>

<br>

<div class="parent">
  <div class="flex-container-wrapped">
    <nav class="charts">
      <p style="text-align: center; font-size: 18px">Times per Dead Check</p>
      <div class="chart">
        <div id="dead_checks_times_chart_div"></div>
        <p style="text-align: center; font-size: 12px">*Number inside bar is number of runs with that amount of dead
          checks.</p>
      </div>
    </nav>
    <nav class="charts-half">
      <p style="text-align: center; font-size: 18px">Times per Ability</p>
      <div class="chart">
        <div id="abilities_times_chart_div"></div>
        <p style="text-align: center; font-size: 12px">*Number inside bar is number of runs with that ability.</p>
      </div>
    </nav>
    <nav class="charts">
      <p style="text-align: center; font-size: 18px">Times per Character</p>
      <div class="chart">
        <div id="char_times_chart_div"></div>
        <p style="text-align: center; font-size: 12px">*Number inside bar is number of runs with that character.</p>
      </div>
    </nav>

  </div>
</div>
<br>
