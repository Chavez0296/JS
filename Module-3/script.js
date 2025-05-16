$(document).ready(function(){
  $("#getWeatherBtn").on("click", ()=> {
    let findZip = $("#zipCode").val();
    let apikey = '0dcede225e7f6ed9a112e16674a24522';
    let endpointUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${findZip},us&appid=${apikey}&units=imperial`;

    $.getJSON(endpointUrl, (result) => {
      if(result){
        $("span").fadeOut(0);
      $("img").fadeOut(0);
      $(".weatherDetails").fadeOut(0);
      
      $("span").fadeIn("slow");
      $("img").fadeIn("slow");
      $(".weatherDetails").fadeIn("slow");
      
      $("#locationName").text(`${result.name}, ${result.sys.country}`);        
      $("#condition").text(`${result.weather[0].main}`);       
      $("#weatherIcon").attr("src",`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
      
      $("#currentTemp").text(`${Math.round(result.main.temp)}`);
      $("#minTemp").text(`${Math.round(result.main.temp_min)}`);
      $("#maxTemp").text(`${Math.round(result.main.temp_max)}`);
      $("#windSpeed").text(`${Math.round(result.wind.speed)}`);     
      $("#humidity").text(`${result.main.humidity}`);
      $("#pressure").text(`${result.main.pressure}`);
      }
    })
    .fail(function(){
            alert('Please enter a valid zipcode!');
        })
    $("#zipCode").val("");
  })
});