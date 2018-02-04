$(function () {
	var searchUrl = 'https://restcountries.eu/rest/v1/name/';
	var countrylUrl = 'https://restcountries.eu/rest/v2/alpha/';
	var countriesList = $('#countries');

	$('#search').click(searchCountries);

	function searchCountries() {
		var countryName = $('#country-name').val();
		if(!countryName.length) { 
			countryName = 'Poland'; 
		}
		$.ajax({
			url: searchUrl + countryName,
			method: 'GET',
			success: getCountryCode
		});
	}

	function getCountryCode(response) {
		response.forEach(function(item) {
			$.ajax({
				url: countrylUrl + item.alpha3Code,
				method: 'GET',
				success: addCountry
			});
		});
	}

	function addCountry(res) {
		var arguments = [res.capital, res.area, res.population];
		var item = Country(res.flag, arguments, res.name, res.languages, res.currencies);
		$(item).appendTo(countriesList);
	}

	function Country(countryFlag, args, countryName, languages, currencies) {
		var $item = $("<div>").addClass("country-container p-2 m-2 text-left");
		var $countryHeaders = countryHeaders();
		var $image = $("<img>");
		$image.attr('src', countryFlag);
		$($image).appendTo($item);
		$("<h3>").text(countryName).addClass("d-inline-block ml-2").appendTo($item);
		var $holder = $("<div>").addClass("info-content pl-3");

		args.forEach(function(item) {
			$("<p>").text(item).appendTo($holder);
		});

		$("<p>").text(getTextFromArrays(languages)).appendTo($holder);
		$("<p>").text(getTextFromArrays(currencies)).appendTo($holder);

		var $countryInfo = $("<div>").addClass("country-info d-flex mt-2");
		$($countryHeaders).appendTo($countryInfo);
		$($holder).appendTo($countryInfo);
		$($countryInfo).appendTo($item);

		return $item;
	}

	function countryHeaders() {
		var $item = $("<div>").addClass("info-headers pr-3");

		$("<p>").text("Capital").appendTo($item);
		$("<p>").text("Land area").appendTo($item);
		$("<p>").text("population").appendTo($item);
		$("<p>").text("Language(s)").appendTo($item);
		$("<p>").text("Currency").appendTo($item);

		return $item;
	}

	function getTextFromArrays(item) {
		var text = ' ';
		item.forEach(function(item) {
			text += item.name + ', ';
		});

		return text;
	}

});