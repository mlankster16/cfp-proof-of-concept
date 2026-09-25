/* Duke Coursera Specialization CFP: proof of concept behaviour.
   1. Placeholder links (a[data-tbd]) are marked and don't navigate.
   2. "On this page" menu highlights the current section.
   3. Fit check: six questions, one at a time, then a summary.
   No dependencies. Nothing is stored or sent anywhere. */
(function () {
  // 1. Placeholder links
  document.querySelectorAll('a[data-tbd]').forEach(function (a) {
    a.classList.add('tbd-link');
    a.setAttribute('title', 'Placeholder: ' + a.getAttribute('data-tbd'));
    a.addEventListener('click', function (e) { if (a.getAttribute('href') === '#') e.preventDefault(); });
  });

  // 2. Current-section highlight
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && byId[en.target.id]) {
          tocLinks.forEach(function (a) { a.classList.remove('is-current'); });
          byId[en.target.id].classList.add('is-current');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }

  // 3. Fit check
  var body = document.getElementById('fit-body');
  if (!body) return;
  var progress = document.getElementById('fit-progress');

  // Each option carries one result: level ('ready' | 'address' | 'major') and a note.
  // Levels map to the review criteria: Required criteria that aren't met are 'major'.
  var QUESTIONS = [
    { id: 'track', q: 'Which priority track fits your idea best?', help: 'Tracks are reviewed in order, starting with Priority 1.',
      options: [
        { label: 'Priority 1: Responsible and sustainable AI', small: 'One three-Course Specialization on responsible AI, with one Course on sustainable AI, green AI, or sustainable governance of AI. Only one Specialization is selected for this track.', level: 'ready', note: 'Your idea fits Priority 1, the highest priority for this call. The incentive is $45,000. Remember that one of the three Courses focuses on sustainable AI, green AI, or sustainable governance of AI.' },
        { label: 'Priority 2: A Coursera high-demand topic', small: 'Aligns with one of Coursera’s high-demand topics: AI/ML & agentic AI, health & life sciences, finance & accounting, leadership & management, or marketing & branding.', level: 'ready', note: 'Your idea fits Priority 2. The incentive is $40,000. Your proposal will need to name the topic it aligns with.', link: ['high-demand-topics.html', 'See the high-demand topics list'] },
        { label: 'Priority 3: AI within a professional field', small: 'How AI applies within a professional field. Any field is welcome; demand is especially strong in fields like product and project management, data science, marketing, cybersecurity, and more.', level: 'ready', note: 'Your idea fits Priority 3. The incentive is $30,000. Proposals for any field are welcome.' },
        { label: 'I’m not sure yet', level: 'address', note: 'Compare your idea with the three tracks before you apply. Topic alignment is a required criterion.', link: ['#topics', 'Review the priority tracks'] }
      ] },
    { id: 'structure', q: 'Could your idea work as three related Courses?', help: 'Each Course has 2 to 8 hours of learner time and 2 to 4 learning objectives.',
      options: [
        { label: 'Yes, I can picture three Courses', level: 'ready', note: 'Your idea fits the three-Course structure. Section E of the form asks for a short sketch of each Course.' },
        { label: 'Maybe, I haven’t thought it through yet', level: 'address', note: 'Try sketching a working title and two or three objectives for each Course. You don’t need a full outline, but the three-Course structure is a required criterion.', link: ['form-preview.html', 'See what the form asks for each Course'] },
        { label: 'No, it’s a single Course or much larger', level: 'major', note: 'This call supports three-Course Specializations. If your idea is a different size, contact us to talk through other options.' }
      ] },
    { id: 'materials', q: 'Which best describes the materials you have now?', help: 'Think about the Specialization as a whole.',
      options: [
        { label: 'I have videos, slides, activities, or quizzes I’ve taught with', small: 'Materials learners would use directly', level: 'ready', note: 'You have learner-facing materials you’ve taught with. Describe them in your proposal, and we’ll discuss during shortlist conversations whether a shorter timeline is realistic.' },
        { label: 'I have research, writing, talks, or syllabi on this topic', small: 'Materials that show your expertise', level: 'ready', note: 'Your expertise materials support the existing materials criterion. Most projects like this follow the full 9 to 12 month timeline, with you developing learner-facing materials along the way.' },
        { label: 'I’m mostly starting from a new idea', level: 'major', note: 'Proposals are expected to build on materials you already have, and existing materials is a required criterion. If you have related research or teaching, it may count. Contact us if you’re unsure.', link: ['#apply-needs', 'Read what counts as existing materials'] }
      ] },
    { id: 'time', q: 'Can you commit 9 to 12 months beginning mid-Spring 2027?', help: 'Plan on about 60 to 90 hours per Course, or roughly 1.5 to 2.5 hours a week.',
      options: [
        { label: 'Yes', level: 'ready', note: 'Your availability fits the development window.' },
        { label: 'Yes, but I’d need to start later', level: 'address', note: 'The form lets you describe a later start. This call is also identifying a shortlist of Specializations for development in 2028.' },
        { label: 'No, not in that window', level: 'major', note: 'Availability is strongly considered in review. If your schedule changes, or you’d like to be considered for a later cycle, contact us.' }
      ] },
    { id: 'external', q: 'Would the project need outside approvals or complex production?', help: 'For example, continuing education credit, accreditation or grant requirements, several levels of stakeholder review, or custom tools and integrations.',
      options: [
        { label: 'No', level: 'ready', note: 'Your project uses standard formats with few outside dependencies, which fits this call’s timeline.' },
        { label: 'Yes', level: 'address', note: 'Requirements like these usually add time beyond this call’s 9 to 12 month window. Contact us before applying to talk through whether the project could fit.' },
        { label: 'I’m not sure', level: 'address', note: 'Contact us to talk through any requirements you’re unsure about. Feasibility is strongly considered in review.' }
      ] },
    { id: 'dean', q: 'Have you talked with your dean about this idea?', help: 'Award letters go to both you and your dean, and both of you will be asked to accept.',
      options: [
        { label: 'Yes', level: 'ready', note: 'You’ve talked with your dean.' },
        { label: 'Not yet', level: 'address', note: 'Plan to talk with your dean before you submit.' }
      ] }
  ];

  var answers = [];
  var step = 0;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function renderQuestion() {
    var Q = QUESTIONS[step];
    body.innerHTML = '';
    progress.textContent = 'Question ' + (step + 1) + ' of ' + QUESTIONS.length;
    var h = el('h3', 'fit-q', Q.q); h.tabIndex = -1; h.id = 'fit-q';
    body.appendChild(h);
    body.appendChild(el('p', 'fit-help', Q.help));
    var wrap = el('div', 'fit-options'); wrap.setAttribute('role', 'group'); wrap.setAttribute('aria-labelledby', 'fit-q');
    Q.options.forEach(function (o, i) {
      var b = el('button', 'fit-option'); b.type = 'button'; b.textContent = o.label;
      if (o.small) b.appendChild(el('small', null, o.small));
      b.addEventListener('click', function () { answers[step] = i; step++; step < QUESTIONS.length ? renderQuestion() : renderResult(); });
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
    var nav = el('div', 'fit-nav');
    if (step > 0) { var back = el('button', 'link-btn', 'Back'); back.type = 'button'; back.addEventListener('click', function () { step--; renderQuestion(); }); nav.appendChild(back); }
    else nav.appendChild(el('span'));
    body.appendChild(nav);
    if (renderQuestion.started) h.focus();
    renderQuestion.started = true;
  }

  function renderResult() {
    body.innerHTML = '';
    progress.textContent = 'Your results';
    var groups = { ready: [], address: [], major: [] };
    QUESTIONS.forEach(function (Q, i) { var o = Q.options[answers[i]]; groups[o.level].push(o); });
    var status, title, cls;
    if (groups.major.length) { status = 'Not yet a fit'; cls = 'status-notyet'; title = 'This call may not be the right fit right now'; }
    else if (groups.address.length) { status = 'Possible fit'; cls = 'status-maybe'; title = 'Your idea may fit, with a few things to work through'; }
    else { status = 'Good fit'; cls = 'status-good'; title = 'Your idea looks like a good fit for this call'; }

    var r = el('div', 'fit-result');
    r.appendChild(el('span', 'status ' + cls, status));
    var h = el('h3', null, title); h.tabIndex = -1; r.appendChild(h);
    r.appendChild(el('p', 'fit-help', 'This is a planning aid based on the review criteria. It doesn’t predict selection, and your answers aren’t saved.'));

    [['major', 'Worth talking with us about first'], ['address', 'To work on before you apply'], ['ready', 'What looks ready']].forEach(function (g) {
      if (!groups[g[0]].length) return;
      var box = el('div', 'fit-group ' + g[0]); box.appendChild(el('h4', null, g[1]));
      var ul = el('ul');
      groups[g[0]].forEach(function (o) {
        var li = el('li', null, o.note + ' ');
        if (o.link) { var a = el('a', null, o.link[1]); a.href = o.link[0]; li.appendChild(a); }
        ul.appendChild(li);
      });
      box.appendChild(ul); r.appendChild(box);
    });

    var actions = el('div', 'fit-actions');
    var start = el('a', 'btn btn-primary', 'Start your proposal'); start.href = '#'; start.setAttribute('data-tbd', 'form link'); start.classList.add('tbd-link');
    start.addEventListener('click', function (e) { e.preventDefault(); });
    var again = el('button', 'btn btn-secondary', 'Start over'); again.type = 'button';
    again.addEventListener('click', function () { answers = []; step = 0; renderQuestion(); });
    actions.appendChild(start); actions.appendChild(again); r.appendChild(actions);
    body.appendChild(r);
    h.focus();
  }

  renderQuestion();
})();
