import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

export function removeAccents(str) {
  var AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ]
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
    var char = AccentsMap[i][0]
    str = str.replace(re, char)
  }
  return str
}

export function validPhoneNumber(number) {
  const phoneNumberRegex = /^(0[1-9]|11|12|13|14|15|16|17|18|19)[0-9]{8}$/
  const isValidPhoneNumber = phoneNumberRegex.test(number)
  return isValidPhoneNumber
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function handleCaptureClick({
  selector,
  fileName,
}) {
  const downloadEl = document.querySelector(selector);
  console.log("downloadEl",selector,downloadEl)
  if (!downloadEl) return;
  await html2canvas(downloadEl, {
    allowTaint: true,
    useCORS: true,
    backgroundColor: null,
  }).then((canvas) => {
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, fileName, "image/png");
  });
}

export async function handleShare(selector) {
  const downloadEl = document.querySelector(selector);
  if (!downloadEl) return;
  await html2canvas(downloadEl, {
    allowTaint: true,
    useCORS: true,
    backgroundColor: null,
  }).then(async (canvas) => {
    const dataURL = canvas.toDataURL("image/png");
    try {
      if (navigator.share) {
        const base64url = dataURL;
        const blob = await (await fetch(base64url)).blob();
        const file = new File([blob], "fileName.png", { type: blob.type });
        await navigator.share({
          title: "", 
          files: [file],
        });
      } else {
        console.log("Web Share API not supported in this browser.");
        // Handle fallback mechanism (e.g., show a modal with sharing options).
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  });
}
