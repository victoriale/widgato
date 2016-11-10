var res = `
<section class="ddb-menu">
  <!-- Mobile Layout -->
  <section class="ddb-mobile-layout">
    <!-- <button id="ddb-mobile-menu" class="ddb-mobile-menu ddb-parleft ddb-blue ddb-left"> -->
    <button id="ddb-mobile-menu" class="ddb-mobile-menu ddb-left ddb-brand-background">
        <div class="ddb-mobile-parbutton">
            <i class="ddb-icon ddb-icon-box-scores"></i> SPORTS MENU
        </div>
    </button>

    <!-- <button id="ddb-mobile-search" class="ddb-mobile-menu ddb-right ddb-parright"> -->
    <button id="ddb-mobile-search" class="ddb-mobile-menu ddb-right">
        <div class="ddb-mobile-parbutton">
            <i class="ddb-icon"></i>
        </div>
    </button>

    <div id="ddb-mobile-dropdown" class="ddb-mobile-dropdown ddb-dropdown">
        <!-- Boxscores -->
        <div class="ddb-mobile-dropdown-boxscores">
          <!-- Left Button -->
          <button id="ddb-mobile-boxscores-left" class="ddb-boxscores-button ddb-left ddb-brand-boxscores-button">
            <i class="ddb-icon ddb-icon-angle-left"></i>
          </button>
          <!-- Boxscores Frame -->
          <div id="ddb-mobile-boxscores-frame" class="ddb-boxscores-frame">
            <ul id="ddb-mobile-boxscores" class="ddb-boxscores-content">
              <!-- Category -->
              <li id="ddb-mobile-boxscores-mlb">
                <div class="ddb-boxscores-content-category">
                  <span class="ddb-title">MLB</span>
                  <!-- <br>
                  <a class="ddb-link ddb-mlb-nav-box-scores">View All</a> -->
                </div>
              </li>
              <li id="ddb-mobile-boxscores-nfl">
                <div class="ddb-boxscores-content-category">
                  <span class="ddb-title">NFL</span>
                  <!-- <br>
                  <a class="ddb-link ddb-nfl-nav-box-scores">View All</a> -->
                </div>
              </li>
              <li id="ddb-mobile-boxscores-ncaaf">
                <div class="ddb-boxscores-content-category">
                  <span class="ddb-title">NCAAF</span>
                  <!-- <br>
                  <a class="ddb-link ddb-nfl-nav-box-scores">View All</a> -->
                </div>
              </li>
            </ul>
          </div>
          <!-- Right Button -->
          <button id="ddb-mobile-boxscores-right" class="ddb-boxscores-button ddb-right ddb-blue ddb-brand-boxscores-button">
            <i class="ddb-icon ddb-icon-angle-right"></i>
          </button>
        </div>
        <!-- End Boxscores -->

        <!-- Mobile Options -->
        <ul class="ddb-mobile-dropdown-list">
          <!-- MLB -->
          <li class="ddb-mobile-dropdown-item">
            <div class="ddb-mobile-dropdown-tier1">
              <i class="ddb-icon ddb-icon-baseball ddb-brand-text"></i>
              MLB
              <i class="ddb-icon ddb-toggle"></i>
            </div>
            <ul class="ddb-mobile-dropdown-tier2">
              <!-- Sub Items -->
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-mlb-nav-news">
                  <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>
                  News
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-mlb-nav-standings">
                  <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
                  Standings
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-mlb-nav-schedule">
                  <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>
                  Schedule
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-mlb-nav-top-lists">
                  <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>
                  Top Lists
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-mlb-nav-teams">
                  <i class="ddb-icon ddb-icon-team ddb-brand-text"></i>
                  MLB Teams
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-mlb-nav-profile">
                  <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>
                  MLB Profile
                </a>
              </li>
            </ul>
          </li>
          <!-- NBA -->
          <li class="ddb-mobile-dropdown-item">
            <div class="ddb-mobile-dropdown-tier1">
              <i class="ddb-icon ddb-icon-basketball ddb-brand-text"></i>
              NBA
              <i class="ddb-icon ddb-toggle"></i>
            </div>
            <ul class="ddb-mobile-dropdown-tier2">
              <!-- Sub Items -->
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nba-nav-most-wins">
                  <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
                  Most Wins
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nba-nav-most-turnovers">
                  <i class="ddb-icon ddb-icon-box-scores ddb-brand-text"></i>
                  Most Turnovers
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nba-nav-most-rebounds">
                  <i class="ddb-icon ddb-icon-dribbble ddb-brand-text"></i>
                  Most Rebounds
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nba-nav-most-steals">
                  <i class="ddb-icon ddb-icon-magic ddb-brand-text"></i>
                  Most Steals
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nba-nav-most-blocks">
                  <i class="ddb-icon ddb-icon-thumbs-o-down ddb-brand-text"></i>
                  Most Blocks
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nba-nav-most-assists">
                  <i class="ddb-icon ddb-icon-life-ring ddb-brand-text"></i>
                  Most Assists
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nba-nav-teams">
                  <i class="ddb-icon ddb-icon-team ddb-brand-text"></i>
                  NBA Teams
                </a>
              </li>
            </ul>
          </li>
          <!-- NCAA M -->
          <li class="ddb-mobile-dropdown-item">
            <div class="ddb-mobile-dropdown-tier1">
              <i class="ddb-icon ddb-icon-basketball ddb-brand-text"></i>
              NCAA M
              <i class="ddb-icon ddb-toggle"></i>
            </div>
            <ul class="ddb-mobile-dropdown-tier2">
              <!-- Sub Items -->
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaam-nav-most-wins">
                  <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
                  Most Wins
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaam-nav-most-turnovers">
                  <i class="ddb-icon ddb-icon-box-scores ddb-brand-text"></i>
                  Most Turnovers
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaam-nav-most-rebounds">
                  <i class="ddb-icon ddb-icon-dribbble ddb-brand-text"></i>
                  Most Rebounds
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaam-nav-most-steals">
                  <i class="ddb-icon ddb-icon-magic ddb-brand-text"></i>
                  Most Steals
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaam-nav-most-blocks">
                  <i class="ddb-icon ddb-icon-thumbs-o-down ddb-brand-text"></i>
                  Most Blocks
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaam-nav-most-assists">
                  <i class="ddb-icon ddb-icon-life-ring ddb-brand-text"></i>
                  Most Assists
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaam-nav-teams">
                  <i class="ddb-icon ddb-icon-team ddb-brand-text"></i>
                  NCAA M Teams
                </a>
              </li>
            </ul>
          </li>
          <!-- NFL -->
          <li class="ddb-mobile-dropdown-item">
            <div class="ddb-mobile-dropdown-tier1">
              <i class="ddb-icon ddb-icon-football ddb-brand-text"></i>
              NFL
              <i class="ddb-icon ddb-toggle"></i>
            </div>
            <ul class="ddb-mobile-dropdown-tier2">
              <!-- Sub Items -->
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nfl-nav-news">
                  <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>
                  News
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nfl-nav-standings">
                  <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
                  Standings
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nfl-nav-schedule">
                  <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>
                  Schedule
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nfl-nav-top-lists">
                  <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>
                  Top Lists
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nfl-nav-teams">
                  <i class="ddb-icon ddb-icon-team ddb-brand-text"></i>
                  NFL Teams
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-nfl-nav-profile">
                  <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>
                  NFL Profile
                </a>
              </li>
            </ul>
          </li>
          <!-- NCAA F -->
          <li class="ddb-mobile-dropdown-item">
            <div class="ddb-mobile-dropdown-tier1">
              <i class="ddb-icon ddb-icon-football ddb-brand-text"></i>
              NCAA F
              <i class="ddb-icon ddb-toggle"></i>
            </div>
            <ul class="ddb-mobile-dropdown-tier2">
              <!-- Sub Items -->
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaaf-nav-news">
                  <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>
                  News
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaaf-nav-standings">
                  <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
                  Standings
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaaf-nav-schedule">
                  <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>
                  Schedule
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaaf-nav-top-lists">
                  <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>
                  Top Lists
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaaf-nav-teams">
                  <i class="ddb-icon ddb-icon-team ddb-brand-text"></i>
                  NCAA F Teams
                </a>
              </li>
              <li class="ddb-mobile-dropdown-tier2-item">
                <a target="_blank" class="ddb-ncaaf-nav-profile">
                  <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>
                  NCAA F Profile
                </a>
              </li>
            </ul>
          </li>

        </ul>
        <!-- End Mobile Options -->
    </div>

    <div id="ddb-mobile-search-bar" class="ddb-mobile-dropdown ddb-dropdown">
      <div class="ddb-mobile-dropdown-search">
        <input id="ddb-search-mobile" placeholder="Search any ncaa, nfl, mlb, nba team..">
        <i class="ddb-icon ddb-icon-search ddb-brand-text"></i>
      </div>
      <ul id="ddb-search-mobile-dropdown" class="ddb-search-dropdown">

      </ul>
    </div>
  </section>
  <!-- End Mobile Layout -->

  <!-- Tablet/Desktop Layout -->
  <ul class="ddb-menu-nav">
    <!-- Box Scores -->
    <li id="ddb-dropdown-boxscores">
      <!-- <div id="ddb-dropdown-boxscores-button" class="ddb-blue ddb-parleft">
        <i class="ddb-icon ddb-icon-box-scores"></i>
        Scoreboard
      </div> -->
      <div id="ddb-dropdown-boxscores-button" class="ddb-blue ddb-brand-background">
          <div class="ddb-parbutton">
              <i class="ddb-icon ddb-icon-box-scores"></i>
              Scoreboard
          </div>
      </div>
      <!-- Hover Dropdown -->
      <div id="ddb-boxscores-dropdown" class="ddb-menu-dropdown ddb-dropdown">
        <div class="ddb-menu-dropdown-container">
          <div id="ddb-boxscores-events-container" class="ddb-menu-dropdown-events">
            <button id="ddb-boxscores-events-button" class="ddb-menu-dropdown-events-button ddb-brand-boxscores-filter">
              Sports
              <i class="ddb-icon ddb-icon-angle-right"></i>
            </button>
            <div class="ddb-menu-dropdown-events-options">
              <div class="ddb-menu-dropdown-events-options-title">
                Select Which Scoreboard to View
              </div>
              <ul id="ddb-boxscores-options" class="ddb-menu-dropdown-events-options-list">
                <li id="ddb-boxscores-options-all" class="ddb-active ddb-brand-boxscores-option">
                  ALL
                </li>
                <li id="ddb-boxscores-options-mlb" class="ddb-brand-boxscores-option">
                  MLB
                </li>
                <li id="ddb-boxscores-options-nfl" class="ddb-brand-boxscores-option">
                  NFL
                </li>
                <li id="ddb-boxscores-options-ncaaf" class="ddb-brand-boxscores-option">
                  NCAAF
                </li>
              </ul>
            </div>
          </div>
          <div class="ddb-menu-dropdown-boxscores">
            <!-- Left Button -->
            <button id="ddb-desktop-boxscores-left" class="ddb-boxscores-button ddb-left ddb-brand-boxscores-button">
              <i class="ddb-icon ddb-icon-angle-left"></i>
            </button>
            <!-- Boxscores Frame -->
            <div id="ddb-desktop-boxscores-frame" class="ddb-boxscores-frame">
              <ul id="ddb-desktop-boxscores" class="ddb-boxscores-content">
                <!-- Category -->
                <li id="ddb-desktop-boxscores-mlb">
                  <div class="ddb-boxscores-content-category">
                    <span class="ddb-title">MLB</span>
                    <!-- <br>
                    <a class="ddb-link ddb-mlb-nav-box-scores">View All</a> -->
                  </div>
                </li>
                <li id="ddb-desktop-boxscores-nfl">
                  <div id="ddb-desktop-boxscores-nfl" class="ddb-boxscores-content-category">
                    <span class="ddb-title">NFL</span>
                    <!-- <br>
                    <a class="ddb-link ddb-nfl-nav-box-scores">View All</a> -->
                  </div>
                </li>
                <li id="ddb-desktop-boxscores-ncaaf">
                  <div class="ddb-boxscores-content-category">
                    <span class="ddb-title">NCAA F</span>
                    <!-- <br>
                    <a class="ddb-link ddb-nfl-nav-box-scores">View All</a> -->
                  </div>
                </li>
              </ul>
            </div>
            <!-- Right Button -->
            <button id="ddb-desktop-boxscores-right" class="ddb-boxscores-button ddb-right ddb-blue ddb-brand-boxscores-button">
              <i class="ddb-icon ddb-icon-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </li>
    <!-- MLB -->
    <li id="ddb-dropdown-mlb" class="ddb-menu-nav-item ddb-dynamic-item">
      MLB
    </li>
    <!-- NBA -->
    <li id="ddb-dropdown-nba" class="ddb-menu-nav-item ddb-dynamic-item">
      NBA
    </li>
    <!-- NCAA -->
    <li id="ddb-dropdown-ncaam" class="ddb-menu-nav-item ddb-dynamic-item">
      NCAA M
    </li>
    <!-- NFL -->
    <li id="ddb-dropdown-nfl" class="ddb-menu-nav-item ddb-dynamic-item">
      NFL
    </li>
    <!-- NCAA F -->
    <li id="ddb-dropdown-ncaaf" class="ddb-menu-nav-item ddb-dynamic-item">
      NCAA F
    </li>
  </ul>
  <!-- Dynamic Dropdown -->
  <div class="ddb-menu-nav-dynamic ddb-dynamic-dropdown">
    <div class="ddb-menu-dropdown-container">
      <!-- Nav -->
      <section id="ddb-dynamic-nav" class="ddb-menu-dropdown-nav"></section>
      <!-- Content -->
      <div class="ddb-menu-dropdown-content">
        <section id="ddb-dynamic-links" class="ddb-menu-dropdown-links"></section>
        <!-- Ad Space -->
        <!-- <div id="ddb-ad" class="ddb-menu-dropdown-ad">

        </div> -->
      </div>
    </div>
  </div>

  <div class="ddb-menu-options">
    <!-- Medium Nav Search -->
    <button id="ddb-small-desktop-search" class="ddb-menu-search">
      <i class="ddb-icon ddb-icon-search"></i>
    </button>
    <!-- Sports Ticker -->
    <!-- <div class="ddb-menu-ticker ddb-parleft">
      <div class="ddb-menu-ticker-title">
        SPORTS TICKER
      </div>
      <div class="ddb-menu-ticker-container">
        <span id="ddb-ticker-content" class="ddb-menu-ticker-content">
        </span>
      </div>
    </div> -->
    <!-- Large Nav Search -->
    <div class="ddb-menu-search-large">
        <div class="ddb-menu-search-large-content">
            <input id="ddb-search-desktop" placeholder="Search any ncaa, nfl, mlb, nba team..">
            <ul id="ddb-search-desktop-dropdown" class="ddb-search-dropdown">
            </ul>
            <i class="ddb-icon ddb-icon-search ddb-brand-text"></i>
        </div>
    </div>
  </div>

  <div id="ddb-small-desktop-search-bar" class="ddb-menu-search-dropdown ddb-dropdown">
    <div class="ddb-mobile-dropdown-search">
      <input id="ddb-small-desktop-search-input" placeholder="Search any ncaa, nfl, mlb, nba team..">
      <i class="ddb-icon ddb-icon-search ddb-brand-text"></i>
    </div>
    <ul id="ddb-small-desktop-search-dropdown" class="ddb-search-dropdown">

    </ul>
  </div>
  <!-- End Tablet/Desktop Layout -->
</section>
`;
