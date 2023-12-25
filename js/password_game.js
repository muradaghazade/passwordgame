let rules = [
    null,
    {
        id: 1,
        rule: "Your password must be at least 8 characters"
    },
    {
        id: 2,
        rule: "Your password must include a number"
    },
    {
        id: 3,
        rule: "Your password must include an uppercase letter"
    },
    {
        id: 4,
        rule: "Your password must include a special character"
    },
    {
        id: 5,
        rule: "The digits in your password must add up to 40"
    },
    {
        id: 6,
        rule: "Your password must include a day of the week"
    },
    {
        id: 7,
        rule: "Your password must include current year"
    },
    {
        id: 8,
        rule: "Your password must include the length of your password"
    },
    {
        id: 9,
        rule: "Your password must include the key emoji"
    },
    {
        id: 10,
        rule: "Your password must include one of our sponsors:"
    },
    {
        id: 11,
        rule: "The length of your password must be even number"
    },
    {
        id: 12,
        rule: "Your password must include the current time backwards (Example: 01:02 -> 20:10)"
    }
]

function renderRule(rule, status) {
    // if n 
    if (document.getElementById(`rule${rule.id}`)) {
        document.getElementById(`rule${rule.id}`).innerHTML = ""
        if (status == "bad") {
            document.getElementById('rules').innerHTML = `<div class="rule bad" id="rule${rule.id}">
            <div class="rule-title bad-title">
                <img width="20" style="margin-right: 5px;" src="./img/error.svg" alt="">
                <p style="margin: 0;">Rule ${rule.id}</p>
            </div>
            <div class="rule-text bad-text">
                <p style="margin: 0;">${rule.rule}</p>
            </div>
        </div>`
        }
        else if (status == "good") {
            document.getElementById('rules').innerHTML = `<div class="rule" id="rule${rule.id}">
            <div class="rule-title rule-title-good">
                <img width="20" style="margin-right: 10px;" src="./img/checkmark.svg" alt="">
                <p style="margin: 0;">Rule ${rule.id}</p>
            </div>
            <div class="rule-text rule-text-good">
                <p style="margin: 0;">${rule.rule}</p>
            </div>
        </div>`
        }
       
    }
    else {
        if (status == "bad") {
            document.getElementById('rules').innerHTML += `<div class="rule bad" id="rule${rule.id}">
            <div class="rule-title bad-title">
                <img width="20" style="margin-right: 5px;" src="./img/error.svg" alt="">
                <p style="margin: 0;">Rule ${rule.id}</p>
            </div>
            <div class="rule-text bad-text">
                <p style="margin: 0;">${rule.rule}</p>
            </div>
        </div>`
        }
        else if (status == "good") {
            document.getElementById('rules').innerHTML += 
        `<div class="rule" id="rule${rule.id}">
            <div class="rule-title rule-title-good">
                <img width="20" style="margin-right: 10px;" src="./img/checkmark.svg" alt="">
                <p style="margin: 0;">Rule ${rule.id}</p>
            </div>
            <div class="rule-text rule-text-good">
                <p style="margin: 0;">${rule.rule}</p>
            </div>
        </div>`
        }
    }

    if (rule.id==10){
        document.querySelector(`#rule${rule.id} .rule-text`).innerHTML += 
        `<div class="sponsors">
            <img src="../img/apple-logo.png" alt="" class="sponsor" style="height: 85px;"></img>
            <img src="../img/x-logo.png" alt="𝕏" class="sponsor" style="height: 70px;"></img>
            <img src="../img/mcdonalds.png" alt="ᗰ" class="sponsor" style="height: 76px;"></img>
        </div>`;
        document.querySelector(`#rule${rule.id} .rule-text`).style.padding = `10px 10px`
    }

    var rulesContainer = document.getElementById('rules');
    var badRules = rulesContainer.getElementsByClassName('bad');

    Array.from(badRules).forEach(element => {
        rulesContainer.appendChild(element);
    })

}


function contain_digit(str) {
    return /\d/.test(str);
}

function contain_upper(str) {
    return /[A-Z]/.test(str);
}

function contain_special(str) {
    return /[^\w]/.test(str);
}

function digits_summ(str) {
    let total = 0
    for (let char of str) {
        if (/\d/.test(char)){
            total+=parseInt(char)
        }
    }
    return total
}

function contain_day(str) {
    str = str.toLowerCase()
    days=["понедельник","вторник","среда","четверг","пятница","суббота","воскресенье",
        "monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    for (day of days) {
        if (str.includes(day)){
            return true
        }
    }
}

function contain_year(str) {
    const currentYear = new RegExp((new Date().getFullYear()).toString());
    return currentYear.test(str);
}

function contain_sponsor(str) {
    str = str.toLowerCase()
    sponsors=["apple","","x","twitter","𝕏","mcdonalds","mcdonald's","ᗰ"];
    for (sponsor of sponsors) {
        if (str.includes(sponsor)){
            return true
        }
    }
}

function contain_time(str){
    var currentTime = new Date();
    var hours = currentTime.getHours().toString().padStart(2, '0');
    var minutes = currentTime.getMinutes().toString().padStart(2, '0');
    var currentTimeString = `${hours}:${minutes}`;
    var reversedTime = currentTimeString.split('').reverse().join('');
    return str.includes(reversedTime)
}

function password_game(password) {
    var n = 1
    document.querySelector('.password-length').innerHTML = password.length;
    if (password.length>0){
        document.querySelector('.password-length').style.opacity=1
    }
    else {
        document.querySelector('.password-length').style.opacity=0
    }
    
    if(password.length<8) {
        renderRule(rules[1], "bad")
        return null
    }
    else {
        renderRule(rules[1], "good")
        n = 2
    }

    if (contain_digit(password)){
        n = 3
        renderRule(rules[2], "good")
    }
    else {
        renderRule(rules[2], "bad")
        return null
    }

    if (contain_upper(password)){
        n = 4
        renderRule(rules[3], "good")
    }
    else {
        renderRule(rules[3], "bad")
        return null
    }

    if (contain_special(password)){
        n = 5
        renderRule(rules[4], "good")
    }
    else {
        renderRule(rules[4], "bad")
        return null
    }

    if (digits_summ(password)==40){
        n = 6
        renderRule(rules[5], "good")
    }
    else {
        renderRule(rules[5], "bad")
        return null
    }

    if (contain_day(password)){
        n = 7
        renderRule(rules[6], "good")
    }
    else {
        renderRule(rules[6], "bad")
        return null
    }

    if (contain_year(password)){
        n = 8
        renderRule(rules[7], "good")
    }
    else {
        renderRule(rules[7], "bad")
        return null
    }

    if (password.includes(password.length)){
        n = 9
        renderRule(rules[8], "good")
    }
    else {
        renderRule(rules[8], "bad")
        return null
    }

    if (password.includes("🔑")){
        n = 10
        renderRule(rules[9], "good")
    }
    else {
        renderRule(rules[9], "bad")
        return null
    }

    if (contain_sponsor(password)){
        n = 11
        renderRule(rules[10], "good")
    }
    else {
        renderRule(rules[10], "bad")
        return null
    }

    if (password.length%2==0){
        n = 12
        renderRule(rules[11], "good")
    }
    else {
        renderRule(rules[11], "bad")
        return null
    }

    if (contain_time(password)){
        n = 13
        renderRule(rules[12], "good")
    }
    else {
        renderRule(rules[12, "bad"])
        return null
    }
}


// Salam91002@sundayy202332🔑x81:61