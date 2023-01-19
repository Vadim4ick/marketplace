/* Маски для полей (в работе) */

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import "inputmask/dist/inputmask.min.js";

// const inputMasks = document.querySelectorAll('input');
// if (inputMasks.length) {
// 	flsModules.inputmask = Inputmask().mask(inputMasks);
// }

const inputGosts = document.getElementById("gosts");

new Inputmask("8(999)-999-99-99", {
  showMaskOnHover: false,
  placeholder: " ",
}).mask(inputPhone);
