// public/script.js

$(function () {
  const $status = $("#status-message");
  const $card = $("#weather-card");

  function showStatus(message, type = "info") {
    $status
      .removeClass("d-none alert-info alert-danger alert-success")
      .addClass(`alert-${type}`)
      .text(message);
  }

  function hideStatus() {
    $status.addClass("d-none");
  }

  function addRecentCity(city) {
    if (!city) return;
    const key = "recentCities";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");

    const filtered = [city, ...stored.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
    localStorage.setItem(key, JSON.stringify(filtered));
    renderRecentCities();
  }

  function renderRecentCities() {
    const key = "recentCities";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const $list = $("#recent-list").empty();

    if (!stored.length) {
      $list.append('<li class="list-group-item bg-dark text-muted">No searches yet.</li>');
      return;
    }

    stored.forEach(city => {
      const item = $(`
        <li class="list-group-item list-group-item-action bg-dark text-light recent-item">
          ${city}
        </li>
      `);
      item.on("click", () => fetchWeather(city));
      $list.append(item);
    });
  }

  function formatTime(timestamp) {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    return d.toLocaleString();
  }

  function renderWeather(data) {
    $("#weather-city").text(`${data.name}, ${data.country || ""}`);
    $("#weather-description").text(data.description);
    $("#weather-time").text(`Last updated: ${formatTime(data.timestamp)}`);
    $("#weather-temp").text(Math.round(data.temp));
    $("#weather-feels").text(`${Math.round(data.feelsLike)}°C`);
    $("#weather-humidity").text(`${data.humidity}%`);
    $("#weather-wind").text(`${data.windSpeed} m/s`);

    if (data.icon) {
      $("#weather-icon")
        .attr(
          "src",
          `https://openweathermap.org/img/wn/${data.icon}@2x.png`
        )
        .attr("alt", data.description || "Weather icon");
    }

    $card.removeClass("d-none");
  }

  function fetchWeather(city) {
    if (!city) return;

    showStatus(`Loading weather for "${city}"...`, "info");

    $.getJSON("/api/weather", { city })
      .done(data => {
        hideStatus();
        renderWeather(data);
        addRecentCity(data.name);
      })
      .fail(xhr => {
        const msg =
          xhr.responseJSON?.error ||
          `Could not load weather for "${city}".`;
        showStatus(msg, "danger");
      });
  }

  // form submit
  $("#search-form").on("submit", function (e) {
    e.preventDefault();
    const city = $("#city-input").val().trim();
    if (!city) {
      showStatus("Please enter a city name.", "danger");
      return;
    }
    fetchWeather(city);
  });

  // quick city buttons
  $(".quick-city").on("click", function () {
    const city = $(this).data("city");
    $("#city-input").val(city);
    fetchWeather(city);
  });

  // initial load
  renderRecentCities();
  if (typeof DEFAULT_CITY !== "undefined" && DEFAULT_CITY) {
    fetchWeather(DEFAULT_CITY);
  }
});
