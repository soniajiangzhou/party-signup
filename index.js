
const submit = document.querySelector('#btn');
const nameEle = document.querySelector('#name');
const timeEle = document.querySelector('#time');
const plusOneEle = document.querySelector('#plusOne');
const plusOneNameEle = document.querySelector('#plusOneName');
const foodEle = document.querySelector('#food');
const drinkEle = document.querySelector('#drink');
const instrumentEle = document.querySelector('#instrument');
const gameEle = document.querySelector('#game');
const othersEle = document.querySelector('#others');
const messageEle = document.querySelector(".textarea");


const foodCheck = document.querySelector('#foodcheck');
const drinkCheck = document.querySelector('#drinkcheck');
const instrumentCheck = document.querySelector('#instrumentcheck');
const gameCheck = document.querySelector('#gamecheck');
const othersCheck = document.querySelector('#otherscheck');

const seeFullList = document.querySelector('#fullList');
const fullListRoot = document.querySelector('#fullListRoot');


const onClick = ()=>{ 
  let person = nameEle.value;
  let time = timeEle.value;
  let plusOne = Number(plusOneEle.value);
  let plusOneName = plusOneNameEle.value;
  let food = foodEle.value;
  let drink = drinkEle.value;
  let instrument = instrumentEle.value;
  let game = gameEle.value;
  let others = othersEle.value;
  let message = messageEle.value;

  console.log(person,time,plusOne,plusOneName,food,drink,instrument,game,others,message)

  if(!person){alert("Please fill in your name")}
  else if(!time){alert("Please fill in your ETA")}

  uploadData(person,time, plusOne,plusOneName,food,drink,instrument,game,others,message);
  getFullList();
  
};

const uploadData =async(person,time, plusOne,plusOneName,food,drink,instrument,game,others,message)=>{
    const data = JSON.stringify({
      query: `mutation newParticipant {
                createPartySignup(
                  input: 
                    {data: 
                      {name: "${person}", 
                       time: "${time}",
                       plusOne: ${plusOne},
                       plusOneName: "${plusOneName}",
                       food: "${food}",
                       drink: "${drink}",
                       instrument: "${instrument}",
                       game: "${game}",
                       others: "${others}",
                       message: "${message}",
                      } ,
                    } 
                ) {
                  partySignup {
                    name,time,plusOne,food,drink,instrument,game,others,message
                  }
                }
              }`,
    });

    const response = await axios(
      { url:'https://strapi.greensteps.cn/graphql',
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response);

    return response.data.data.createPartySignup.partySignup;
    
};

const fetchData =async()=>{
      const data = JSON.stringify({
        query: `query  {
                      partySignups {
                      name
                      time
                      plusOne
                      plusOneName
                      food
                      drink
                      instrument
                      game
                      others
                      message
                    }
                  }`,
      });
  
      const response = await axios(
        { url:'https://strapi.greensteps.cn/graphql',
          method: 'post',
          data: data,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.data.partySignups;
      
};

const getFullList =async()=>{
    const fullList = await fetchData();
    for(let rsvp of fullList){
      let food = rsvp.food?(rsvp.food+";"):"";
      let drink = rsvp.drink?(rsvp.drink+";"):"";
      let game = rsvp.game?(rsvp.game+";"):"";
      let instrument = rsvp.instrument?(rsvp.instrument+";"):"";
      let others = rsvp.others?(rsvp.others+";"):"";

      const detail = document.createElement('div');
      detail.setAttribute('class','card');
      detail.innerHTML=`<div color ="white">
        <strong> Guest: </strong> ${rsvp.plueOneName?(rsvp.name +"+"+ rsvp.plueOneName):rsvp.name} <br> 
        <strong> ETA: </strong> ${rsvp.time} <br> 
        <strong> Bring </strong> :${food} ${drink} ${game} ${instrument} ${others} 
        </div>`;
      fullListRoot.appendChild(detail);

    }
};

plusOneEle.addEventListener('input',()=>{if(plusOneEle.value>0)
    {document.querySelector(".plusOneName").classList.remove("is-hidden")}}
);

foodCheck.addEventListener('click',()=>{if(foodCheck.checked){foodEle.removeAttribute("disabled")}else{foodEle.setAttribute("disabled","")}});
drinkCheck.addEventListener('click',()=>{if(drinkCheck.checked){drinkEle.removeAttribute("disabled")}else{drinkEle.setAttribute("disabled","")}});
instrumentCheck.addEventListener('click',()=>{if(instrumentCheck.checked){instrumentEle.removeAttribute("disabled")}else{instrumentEle.setAttribute("disabled","")}});
gameCheck.addEventListener('click',()=>{if(gameCheck.checked){gameEle.removeAttribute("disabled")}else{gameEle.setAttribute("disabled","")}});
othersCheck.addEventListener('click',()=>{if(othersCheck.checked){othersEle.removeAttribute("disabled")}else{othersEle.setAttribute("disabled","")}});


submit.addEventListener('click',()=>{onClick()});

seeFullList.addEventListener('click',()=>{getFullList()});


// const getUploadeResult = async()=>{
//   const result = await uploadData();
//   console.log(result);
// };


//   getUploadeResult();


