import { updatMyInfo } from "../js_petwalk/myInfo/appMyInfo.js";

$.fn.lightBox2 = function () {
  createLightBox();

  $(".light_box .b-close").on("click", function () {
    closeLightBox();
  })

  $(".light_box #minus-btn").on("click", function () {
    minos();
  })
  $(".light_box #plus-btn").on("click", function () {
    plus();
  })

  $('#qty_input').prop('disabled', true);

  $("#data-light2").on("click", function () {
    console.log("aaaa2")
    let imgSrc = $(this).attr("data-percent");
    let imgAlt = $(this).attr("data-alt");
    showLightBox(imgSrc, imgAlt);
  })
}

const showLightBox = (_img, _txt) => {
  $(".light_box .light_img").attr("value", _img);
  $(".light_box .light_txt").html(_txt);


  $(".light_box").fadeIn(700);
  $(".light_box").css("display", "flex");
}

const closeLightBox = () => {
  $(".light_box").fadeOut(700);
  updatMyInfo($('#qty_input').val());
}


const minos = () => {
  $('#qty_input').val(parseInt($('#qty_input').val()) - 1);
  $(".light_box #qty_input").attr("value", $('#qty_input').val());
  console.log($('#qty_input').val());
  if ($('#qty_input').val() == 0) {
    $('#qty_input').val(1);
  }
}

const plus = () => {
  if ($('#qty_input').val() == 100) {
    $('#qty_input').val(100);
  }
  else{
    $('#qty_input').val(parseInt($('#qty_input').val()) + 1);
    console.log($('#qty_input').val());
    $(".light_box #qty_input").attr("value", $('#qty_input').val());
  }
}



const createLightBox = () => {
  $("body").prepend(`
  <div class="light_box">
    <div class="light_inside">

      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-sm-6">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-dark btn-sm mr-2" id="minus-btn" style="border-radius: 50%; background-color: #6EA8FF"><i class="fa fa-minus" style="font-size:40px;"></i></button>
                </div>
                <input type="number" id="qty_input" class="light_img form-control form-control-sm text-center" style="font-size:20px" value="1" min="1">
                <div class="input-group-prepend">
                    <button class="btn btn-dark btn-sm ml-2" id="plus-btn" style="border-radius: 50%; background-color: #6EA8FF"><i class="fa fa-plus" style="font-size:40px;"></i></button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <button class="b-close" style="background-color:green;"><i class="fa fa-check" aria-hidden="true" style="font-size:40px;" ></i></button>
    </div>
  </div>
  `)


  let lightCss = {
    position: "fixed",
    display: "none",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
    padding: "8px"
  }
  $(".light_box").css(lightCss);

  let insideCss = {
    maxWidth: "600px",
    width: "100%",
    background: "white",
    border: "2px solid grey",
    minHeight: "300px",
    padding: "8px",
    textAlign: "center"
  }
  $(".light_inside").css(insideCss);
}
