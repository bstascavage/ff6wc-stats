---
layout: page
title: "Time Breakdown"
desc: "Stats pertaining to run times"
cover: "/assets/cover-1.webp"
permalink: /stats/times/
main_nav: true
---



<head>
  <script src="https://unpkg.com/jquery@3.6.0/dist/jquery.slim.min.js" defer></script>
  <script src="https://unpkg.com/sheetrock@1.2.0/dist/sheetrock.min.js" defer></script>
  <script src="https://unpkg.com/handlebars@4.5.0/dist/handlebars.min.js" defer></script>
  <script defer src="./javascript/index.js"></script>


  <!-- <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"> -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>



<p style="text-align: center; font-size: 24px">Overview</p>
<div class="parent">
  <div class="flex-container-centered">
    <nav class="item">
      <!-- Attempts -->
      <iframe width="295" height="50" seamless frameborder="0" scrolling="no"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=1936065713&amp;format=interactive"></iframe>
    </nav>
  </div>
</div>

<div class="parent">
  <div class="flex-container-stats">
    <nav class="stat-card-flex">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Best Time</p>
          <h2> <span id="best_time"></span></h2>
        </div>
        <!-- <div class="stat-card__icon stat-card__icon--success">
            <div class="stat-card__icon-circle">
              <i class="fa fa-suitcase"></i>
            </div>
          </div> -->
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Number of Attempts</p>
          <h2> <span id="num_of_attempts"></span></h2>
        </div>
        <!-- <div class="stat-card__icon stat-card__icon--success">
            <div class="stat-card__icon-circle">
              <i class="fa fa-suitcase"></i>
            </div>
          </div> -->
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Average Time</p>
          <h2> <span id="average_time"></span></h2>
          <div>
            <div id="average_time_delta_div">
              <div id="average_time_delta_arrow"></div> <span id="average_time_delta"></span>
            </div>

            <!-- <span class="text-success font-weight-bold mr-1"><i class="fa fa-arrow-up"></i> +5%</span> -->
            <span class="text-muted">after last run</span>
          </div>
        </div>
        <!-- <div class="stat-card__icon stat-card__icon--success">
            <div class="stat-card__icon-circle">
              <i class="fa fa-suitcase"></i>
            </div>
          </div> -->
      </div>
    </nav>
    <nav class="stat-card-flex">
      <div class="stat-card">
        <div class="stat-card__content">
          <p class="text-uppercase mb-1 text-muted">Average Time - Last 5 Runs</p>
          <h2> <span id="average_time_last_five"></span></h2>
          <div>
            <div id="average_time_delta_last_five_div">
              <div id="average_time_delta_last_five_arrow"></div> <span id="average_time_delta_last_five"></span>
            </div>

            <!-- <span class="text-success font-weight-bold mr-1"><i class="fa fa-arrow-up"></i> +5%</span> -->
            <span class="text-muted">after last run</span>
          </div>
        </div>
        <!-- <div class="stat-card__icon stat-card__icon--success">
            <div class="stat-card__icon-circle">
              <i class="fa fa-suitcase"></i>
            </div>
          </div> -->
      </div>
    </nav>
  </div>
</div>

<!-- <div class="parent">
  <div class="flex-container">
    <nav class="item">
      Best Time
      <iframe width="270" height="117" seamless frameborder="0" scrolling="no"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=1700953034&amp;format=interactive"></iframe>

    </nav>
    <nav class="item">
      Average Time
      <iframe width="270" height="117" seamless frameborder="0" scrolling="no"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=274751191&amp;format=interactive"></iframe>

    </nav>
    <nav class="item">
      Average Time - Last 5
      <iframe width="270" height="117" seamless frameborder="0" scrolling="no"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=709726460&amp;format=interactive"></iframe>

    </nav>

  </div>
</div> -->

<br>
<div class="parent">
  <div class="flex-container">
    <nav class="item">
      <div class="shadow">
        <!-- Run Times -->
        <iframe width="823" height="371" seamless frameborder="0" scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=293573893&amp;format=interactive"></iframe>
      </div>
    </nav>
  </div>
</div>

<br>
<p style="text-align: center; font-size: 24px">Skip Stats</p>
<div class="parent">
  <div class="flex-container">
    <nav class="item">
      <!-- Skip Rate -->
      <iframe width="259" height="50" seamless frameborder="0" scrolling="no"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=906300537&amp;format=interactive"></iframe>
    </nav>
  </div>
</div>

<div class="parent">
  <div class="flex-container-centered">
    <nav class="item">
      <!-- Average Time - Skip -->
      <iframe width="270" height="117" seamless frameborder="0" scrolling="no"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=221549340&amp;format=interactive"></iframe>
    </nav>
    <nav class="item">
      <!-- Average Time - No Skip -->
      <iframe width="270" height="117" seamless frameborder="0" scrolling="no"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=1931176540&amp;format=interactive"></iframe>
    </nav>
  </div>
</div>

<br>
<div class="parent">
  <div class="flex-container">
    <nav class="item">
      <div class="shadow">
        <!-- Run Times - Skip vs No Skip -->
        <iframe width="823" height="371" seamless frameborder="0" scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=99849945&amp;format=interactive"></iframe>
      </div>
    </nav>
  </div>
</div>

<br>
<p style="text-align: center; font-size: 24px">Time Breakdown</p>
<div class="parent">
  <div class="flex-container-wrapped">
    <nav class="item">
      <div class="shadow">
        <!-- Average Time per Starting Character -->
        <iframe width="823" height="371" seamless frameborder="0" scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=621759507&amp;format=interactive"></iframe>
      </div>
    </nav>
    <nav class="item">
      <div class="shadow">
        <!-- Average Time per # of Dead Checks -->
        <iframe width="823" height="371" seamless frameborder="0" scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRiTdSqwPMqGoHBbeToYQvZd2e2I6RdaXCL4BTJVJrg1cAX7G61heSd1XSQCr62lwCSL72wMksKED8c/pubchart?oid=501344415&amp;format=interactive"></iframe>
      </div>
    </nav>
  </div>
</div>

<br>
<p style="text-align: center; font-size: 24px">Misc Stats</p>

A breakdown of an average run:

- <span id="num_of_dragons">{{cells}}</span> Dragons killed
- <span id="num_of_dead_checks">{{cells}}</span> Dead Checks
- The highest level amonst all part members is level <span id="highest_level">{{cells}}</span>

<table id="num_of_dragons" class="table table-condensed table-striped"></table>
