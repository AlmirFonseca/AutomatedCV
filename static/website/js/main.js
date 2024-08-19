// Importing the personal data from the json file
import personalData from '../../author_data/personal_data.json' with { type: "json" };

console.log(personalData);
document.getElementById('name').innerHTML = personalData.name;
document.getElementById('title').innerHTML = personalData.title;
document.getElementById('biography').innerHTML = personalData.biography;

// Interests list
let interestsList = document.getElementById('interests');
personalData.interests.forEach(interest => {
    let li = document.createElement('li');
    li.innerHTML = interest;
    interestsList.appendChild(li);
});
