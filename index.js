// let position = 0;
// const slidesToShow = 2;
// const slidesToScroll = 1;
// const container = document.querySelector('.slider-container');
// const track = document.querySelector('.slider-track');
// const items = document.querySelector('.slider-item');
// const btnPrev = document.querySelector('.btn-prev'); 
// const btnNext = document.querySelector('.btn-next'); 
// const itemsCount = items.lengt;
// const itemWidth = container.clientWidth / slidesToShow;
// const movePosition = slidesToScroll * itemWidth;

// items.forEach((item) => {
//   item.style.minWidth = `${itemWidth}px`;
// })

// btnNext.addEventListener('click', () => {
//   const itemsLeft = itemCount - (Math.abc(position) + slidesToShow * itemWidth) / itemWidth;

//   position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

//   setPosition();
//   checkBtns();
// })

// btnNext.addEventListener('click', () => {
//   const itemsLeft = Math.abc(position) / itemWidth;

//   position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

//   setPosition();
//   checkBtns();
// })

// const setPosition = () => {
//   track.style.transform = `translateX(${position}px)`
// }

// const checkBtns = () => {
//   btnPrev.disabled = position === 0;
//   btnNext.disabled = position <= -(itemCount - slidesToShow) * itemWidth;
// }

// checkBtns();



// //діаграми
//   function drawGraph() {
//     const canvases = document.querySelectorAll('.solutions-diagrams_canvas');
//     canvases.forEach(item => {
//        let progress = 0;
//        let timer;

//        const canvas = item;
//        const ctx = canvas.getContext('2d');
//        const x = canvas.width / 2;
//        const y = canvas.height / 2;
//        const radius = 100;
//        const startAngle = 1.5 * Math.PI;
//        const value = parseInt(canvas.previousElementSibling.innerHTML);
//        const counterClockwise = false;


//        ctx.beginPath()
//        ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise)
//        ctx.lineWidth = 12;
//        ctx.strokeStyle = '#f2c351';
//        ctx.stroke();
 
//        function drawText(x, y, text, ctx) {
//         ctx.font = "30px Arial";
//         ctx.fillText(text, x, y);
//        }
 
//        function removeText(x, y, txt_length, font_height, char_width, ctx) {
//         ctx.clearRect(x, y - font_height, char_width * txt_length, font_height);
//        }
 
//        timer = setInterval(() => {
//          const procent = progress * 2 / 100;

//         window.removeEventListener('scroll', drawGraph)
//         let procent = progress * 2 / 100;
//         let endAngle = (procent + 1.5) * Math.PI;
//         ctx.beginPath();
//         let text = `${Math.abs(progress - 1)}%`;
 
 
 
        
//         ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
//         ctx.stroke();
//         removeText(105, 140, text.length, 24, 20, ctx)
 
//         drawText(105, 140, text, ctx)
//         if (progress > value) {
//           clearInterval(timer);
//         }
//         progress++;
//        }, 60);
//     })
//  }
 
//  window.addEventListener('scroll', drawGraph);




 //form
const form = document.getElementById('form');
form.addEventListener('submit', formSend);
async function formSend(e) {
   e.preventDefault();
   function formValidate(form) {
      let error = 0;
      const formReq = form.querySelectorAll('._req');

      function emailTest(input) {
         let regExp = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,8})+$/;
         return !regExp.test(input.value);
      }

      formReq.forEach(input => {
         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               input.classList.add('invalid');
               input.nextElementSibling.innerHTML = 'Please, enter correct email';
               error++;
            }
         } else if (input.value === '') {
            input.classList.add('invalid');
            input.nextElementSibling.innerHTML = 'This field is empty';
            error++;
         }
      });

      return error;
   }
   formValidate(form);


   if (error === 0) {
    let response = await fetch('https://my-json-server.typicode.com/elina05/Server/posts/1', {
       method: 'POST',
       body: JSON.stringify({
          name: validateForm[0].value,
          email: validateForm[1].value,
          subject: validateForm[2].value,
          message: validateForm[3].value,
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       }
    });
    for (let i = 0; i < 4; i++) {
       validateForm[i].value = '';
    }

    function deleteMess() {
       document.getElementById('message--success').remove();
    }
    if (response.status >= 200 && response.status <= 300) {
       let div = document.createElement('div');
       div.setAttribute("id", "message--success");
       div.innerHTML = "Message sent successfully";
       validateForm.after(div);

       setTimeout(deleteMess, 5000);
    } else {
       let div = document.createElement('div');
       div.setAttribute("id", "message--error");

       switch (response.status) {
          case 400:
             div.innerHTML = `Bad Request
             please try again later`;
             break;
          case 403:
             div.innerHTML = `Forbidden
             please try again later`;
             break;
          case 404:
             div.innerHTML = `Not Found
             please try again later`;
             break;
          case 500:
             div.innerHTML = `Internal Server Error
             please try again later`;
             break;
          case 503:
             div.innerHTML = `Service Unavailable
             please try again later`;
             break;
          case 504:
             div.innerHTML = `Gateway Timeout
             please try again later`;
             break;
          default:
             div.innerHTML = `Message isn\'t send, 
             please try again later`;
             break;
       }
       validateForm.after(div);
       setTimeout(deleteMess, 5000);
    }
 }

   
}

//  form.addEventListener('submit', formSend)

//  async function formSend(e){
//    e.preventDefault();


//    function formValidate(form){
//      let error = 0;
//      let formReq = document.querySelectorAll('._req')

//      function emailTest(input){
//       return /^\w+([\.-]?\w+)*@\w+([[\.-]?\w+])*(\.\w{2,8})+$/.test(input.value);
//     }

//      formReq.forEach(input => {
//       if (input.classList.contains('contact__email')) {
//          if (emailTest(input)) {
//             input.classList.add('invalid');
//             input.nextElementSibling.innerHTML = 'Please, enter correct email';
//             error++;
//          }
//       } else if (input.value === '') {
//          input.classList.add('invalid');
//          input.nextElementSibling.innerHTML = 'This field is empty';
//          error++;
//       }
//    });

  //  return error;
  //    for (let index = 0; index < formReq.length; index++){
  //      const input = formReq[index];


  //      if (input.classList.contains('._email')){
  //        if(emailTest(input)){
  //         formAddError(input);
  //         error++;
  //        }
  //      } else if (input.getAttribute("type") === "checkbox" && input.checked === false){
  //       formAddError(input);
  //       error++;
  //      } else{
  //        if(input.value === ''){
  //         formAddError(input);
  //         error++;
  //        }
  //      }
  //    }
  //    return error;

  // }
  // let error = formValidate(form);
 

  //  function formAddError(input){
  //    input.parentElement.classList.add('._error');
  //    input.classList.add('._error');
  //  }

  //    function formRemoveError(input){
  //     input.parentElement.classList.remove('._error');
  //     input.classList.remove('._error');
  //   }




// }
