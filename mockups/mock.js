/* shared mock: render あ and loop the stroke animation */
(function(){
  const svg = document.getElementById('sv');
  const g = window.KANA_STROKES['あ'];
  if (!svg || !g) return;
  const wide = svg.dataset.guide !== 'off';
  let html = wide ? '<g class="guide"><line x1="54.5" y1="4" x2="54.5" y2="105"/>' +
    '<line x1="4" y1="54.5" x2="105" y2="54.5"/></g>' : '';
  g.s.forEach((d, i) => { html += '<path class="st ghost" id="s' + i + '" d="' + d + '"/>'; });
  g.n.forEach((n, i) => { html += '<text class="num" id="n' + i + '" x="' + n[0] + '" y="' + n[1] + '">' + (i+1) + '</text>'; });
  svg.innerHTML = html;

  const paths = g.s.map((_, i) => svg.querySelector('#s' + i));
  const nums = g.s.map((_, i) => svg.querySelector('#n' + i));

  function reset(){
    paths.forEach(p => { p.classList.add('ghost'); p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; });
    nums.forEach(n => n.classList.remove('on'));
  }
  function play(i){
    if (i >= paths.length){ setTimeout(() => { reset(); play(0); }, 1600); return; }
    const p = paths[i], L = p.getTotalLength();
    p.classList.remove('ghost');
    p.style.strokeDasharray = L + ' ' + L;
    p.style.strokeDashoffset = L;
    nums[i].classList.add('on');
    const a = p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }],
      { duration: Math.min(1100, Math.max(400, L * 9)), easing: 'ease-in-out', fill: 'forwards' });
    a.onfinish = () => { p.style.strokeDashoffset = '0'; setTimeout(() => play(i + 1), 200); };
  }
  reset(); setTimeout(() => play(0), 500);
})();
