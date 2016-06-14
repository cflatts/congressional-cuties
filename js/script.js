

//the dollar variable holds the entire jquery library


//$.getJSON makes a request to the input url. it returns a promise, the very special object that is described
// at length below
var congressionalPromise = $.getJSON('https://congress.api.sunlightfoundation.com/legislators?apikey=0e85724a8f924c6aba8bd576df364eb7')
// console.log($)


var statesContainer = document.querySelector("#statesContainer")


// we define handleData with the api's response as an input. But this api response is not mentioned anywhere else
// in this code! Confusing, eh? That's because this is handled in the jquery source code. See the comment below
// on the .then() element.
var handleData = function(apiResponse) {
    console.log(apiResponse)
    var legArray = apiResponse.results
    //initialize a string of html
    var htmlString = '<h1>We have ' + apiResponse.count + ' congressional cuties to show you today!</h1>'
    for (var i = 0; i < legArray.length; i ++) {
        var legislatorObject = legArray[i]
        console.log(legislatorObject.state_name)
        //concatenate (add) the state and name of each legislator as we see them.
        htmlString += '<p class="stateName">state:' + legislatorObject.state_name + '</p>'
        htmlString += '<p class="firstName">name:' + legislatorObject.first_name + '</p>'
    }
    // we've now accumulated scores of <p> tags into our htmlString. if we set it as the innerHTML
    // of the statesContainer, the browser will rebuild its DOM tree according to the html structure
    // that we added to the statesContainer
    statesContainer.innerHTML = htmlString
}


// What we're doing here is passing a function along to our promise. The promise says "OK i got your function.
// When the request is fulfilled, and the data is ready, I will pass the data into your function". That passing-in
// is in the jquery source. That's why we define handleData with an input that we ourselves never pass in.
congressionalPromise.then(handleData)

// summary: promise.then() takes as input a function. It queues up that function to run when the promise is fulfilled.
// When the promise is fulfilled (i.e. the data is ready), the promise (and not us) will invoke that function.
