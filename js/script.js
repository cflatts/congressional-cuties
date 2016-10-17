// console.log('hello')
// console.log($)

var congressionalPromise = $.getJSON('https://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=0e85724a8f924c6aba8bd576df364eb7')

var legContainer = document.querySelector('#legContainer')
var inputNode = document.querySelector('input')


var handleData = function(apiResponse) {
    var legArray = apiResponse.results
    var stateString = ''
    for(var i = 0; i < legArray.length; i++) {
        var firstName = legArray[i].first_name,
            lastName = legArray[i].last_name,
            title = legArray[i].title,
            party = legArray[i].party,
            stateName = legArray[i].state_name,
            emailAddress = legArray[i].oc_email,
            website = legArray[i].website,
            facebook = legArray[i].facebook_id,
            twitter = legArray[i].twittter_id,
            termEnd = legArray[i].term_end
        stateString += '<div class = "idBox">'
        stateString +=      '<h3>' + firstName + ' ' + lastName + '</h3>'
        stateString +=      '<h2>' + title + ' -- ' + party + ' - ' + stateName + '</h2>'
        stateString +=      '<ul>'
        stateString +=          '<li>email: ' + emailAddress + '</li>'
        stateString +=          '<li>website: ' + website + '</li>'
        stateString +=          '<li>facebook: ' + facebook + '</li>'
        stateString +=          '<li>twitter: ' + twitter + '</li>'
        stateString +=      '</ul>'
        stateString +=      '<p>Term End: ' + termEnd + '</p>'
        stateString += '</div>'
    }
    legContainer.innerHTML = stateString
}
congressionalPromise.then(handleData)


var searchZip = function(stateCode) {
    var stateUrl = 'https://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=0e85724a8f924c6aba8bd576df364eb7&state=' + stateCode
    var statePromise = $.getJSON(stateUrl)
    statePromise.then(handleData)
}

var handleKeyPress = function(evt) {

    if(evt.keyCode === 13) {
        var stateCode = evt.target.value.toUpperCase()
        searchZip(stateCode)
    }
}


inputNode.addEventListener('keydown', handleKeyPress)