const table = document.querySelector('table'),
      sidePanel = document.getElementById('side-panel'),
      button = document.querySelector('button'),
      spanPi = document.querySelector('#pi'),
      spanSdev = document.querySelector('#s-dev'),
      clicked = false;


if(screen.width < screen.height) 
	    document.querySelector('body').style.flexWrap = "wrap";
  
  
window.addEventListener("orientationchange", function() {
    if(screen.width < screen.height) {
	    document.querySelector('body').style.flexWrap = "wrap";
  }
});


for(i = 0; i < 180; i++) {
  const r = table.insertRow();
  const y = 90 - i;
  for(j = 0; j < 180; j++) {
    x = 90 - j;
    c = r.insertCell();
    c.id = `${i}x${j}`
    c.style.height = "2px";
    c.style.width = "2px";
    c.style.backgroundColor = (x**2 + y**2)**0.5 < 90 && "blue" || ''
    
  }
}

function throwNeedles() {
  const numNeedles = document.querySelector("#needlesInput").value;
  const numTrials = document.querySelector("#trialsInput").value;
  let estPi = [];
  for(j = 0; j < numTrials; j++) {
    clean();
    let inCircle = 0;
    for (i = 0;  i < numNeedles; i++) {
      let x = Math.random() * 180 | 0;
      let y = Math.random() * 180 | 0;
      const c = document.getElementById(`${y}x${x}`)
      x -= 90
      y -= 90
      inCircle += +Math.sqrt(x*x + y*y) < 90
      c.classList.add('needles')
    }

    estPi.push(4 * inCircle/numNeedles)
  }
  const pi = estPi.reduce((a, b) => a + b)/estPi.length;
  const stdDev = (estPi.reduce((a,b) => a+(b - pi)**2)/estPi.length) ** 0.5
  spanPi.textContent += `Est. Pi     : ${pi.toFixed(3)}`
  spanSdev.textContent += `Std. Dev.: ${stdDev.toFixed(3)}`
  button.textContent = 'Clean!'
}

function clean() {
  const needles = document.querySelectorAll('.needles')
  Array.from(needles).forEach(v => v.classList.remove('needles'))
  button.textContent = 'Throw!'
  spanPi.textContent = ''
  spanSdev.textContent = ''
}

function btnClick() {
  console.log("CLICKED")
  if(!clicked) 
    throwNeedles()
  else 
    clean();
  clicked = !clicked
}