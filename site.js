/* Duke Coursera Specialization CFP: proof of concept behaviour.
   1. Placeholder links (a[data-tbd]) are marked and don't navigate.
   2. "On this page" menu highlights the current section.
   3. Fit check: eight questions, one at a time, then a summary.
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
    { id: 'outcome', q: 'When you picture a learner finishing your Specialization, what comes to mind first?', help: 'There’s no wrong answer here. This question is about how you’re framing the idea.',
      options: [
        { label: 'Something they can do or produce, like evaluate an AI tool for bias or draft an AI use policy', level: 'ready', note: 'You’re framing the Specialization around what learners will do, practice, or produce. Section E of the form asks for learning objectives in this form for each Course.' },
        { label: 'A set of topics or ideas they’ll understand', level: 'address', note: 'Try turning a few of your topics into things learners will do. For example, “algorithmic bias” might become “audit an AI tool’s outputs for bias.” Reviewers look for objectives that describe what learners will do, practice, or produce.', link: ['form-preview.html', 'See how the form asks for learning objectives'] },
        { label: 'I’m not sure yet', level: 'address', note: 'Before you apply, sketch two or three things a learner should be able to do by the end of each Course. Reviewers look for objectives that describe what learners will do, practice, or produce.' }
      ] },
    { id: 'structure', q: 'Could your idea fit into three Courses of 2 to 8 hours each?', help: 'Each Course has 2 to 4 learning objectives. Strong proposals are ambitious in what learners gain and realistic in scope.',
      options: [
        { label: 'Yes, and I can picture what each Course covers', level: 'ready', note: 'Your idea fits the three-Course structure. Section E of the form asks for a short sketch of each Course.' },
        { label: 'Probably, but I haven’t mapped the Courses yet', level: 'address', note: 'Try sketching a working title and two or three objectives for each Course. You don’t need a full outline, but the three-Course structure is a required criterion.', link: ['form-preview.html', 'See what the form asks for each Course'] },
        { label: 'It would take more than three Courses to do it justice', level: 'address', note: 'Consider which three Courses would matter most to your learners. A focused Specialization is easier to develop well in 9 to 12 months, and related topics could become a future proposal.' },
        { label: 'It’s really a single Course', level: 'major', note: 'This call supports three-Course Specializations. If your idea is a single Course, contact us to talk through other options.' }
      ] },
    { id: 'materials', q: 'Which best describes the materials you have now?', help: 'Think about the Specialization as a whole.',
      options: [
        { label: 'Videos, slides, activities, or quizzes I’ve taught with', small: 'Materials learners would use directly', level: 'ready', note: 'You have learner-facing materials you’ve taught with. Describe them in your proposal, and we’ll discuss during shortlist conversations whether a shorter timeline is realistic.' },
        { label: 'Research, writing, talks, or syllabi on this topic', small: 'Materials that show your expertise', level: 'ready', note: 'Your expertise materials support the existing materials criterion. Most projects like this follow the full 9 to 12 month timeline, with you developing learner-facing materials along the way.' },
        { label: 'I’m mostly starting from a new idea', level: 'major', note: 'Proposals are expected to build on substantive materials you already have, and existing materials is a required criterion. Related research or teaching may count. Contact us if you’re unsure.', link: ['#apply-needs', 'Read what counts as existing materials'] }
      ] },
    { id: 'activities', q: 'What kinds of learning activities do you imagine?', help: 'Coursera works well with videos, readings, practice activities, auto-graded quizzes, and applied tasks like evaluating a case or building a prompt library.',
      options: [
        { label: 'Mostly those formats, with plenty of applied practice', level: 'ready', note: 'Your activities fit formats that work well in Coursera, which keeps the focus on strong content.' },
        { label: 'Custom tools, simulations, software, or integrations built for this Specialization', level: 'address', note: 'Custom builds usually add time and may not work well in Coursera. Strong proposals put most of their effort into the content itself. Contact us to talk through what’s feasible.' },
        { label: 'Live sessions, group projects, or assignments graded by an instructor', level: 'address', note: 'Coursera learners work on their own schedule, usually without live sessions or instructor grading. Think about how these activities could work self-paced, for example as a case analysis with a model answer.' }
      ] },
    { id: 'external', q: 'Would the project need outside approvals or coordination?', help: 'For example, continuing education credit, accreditation or grant requirements, several levels of stakeholder review, or outside partners who need to sign off on content.',
      options: [
        { label: 'No', level: 'ready', note: 'Your project has few outside dependencies, which fits this call’s timeline.' },
        { label: 'Yes', level: 'address', note: 'Requirements like these usually add time beyond this call’s 9 to 12 month window. Contact us before applying to talk through whether the project could fit.' },
        { label: 'I’m not sure', level: 'address', note: 'Contact us to talk through any requirements you’re unsure about. Feasibility is strongly considered in review.' }
      ] },
    { id: 'authorship', q: 'Who will draft and revise the scripts, slides, activities, and quizzes?', help: 'In this call, faculty author their own content. Each draft goes through at least one round of feedback from the CTL team, and you’ll revise based on that feedback.',
      options: [
        { label: 'I will (or each Course lead will), with feedback from CTL', level: 'ready', note: 'You’re prepared to draft and revise your own materials, which is central to how development works in this call.', link: ['#commitment', 'Review how you and CTL share the work'] },
        { label: 'A graduate student, postdoc, or staff member would help me draft', level: 'address', note: 'Support from others is welcome, but you remain the author. Plan time to guide their drafts, review everything for accuracy, and make final content decisions.' },
        { label: 'I’d share my source material and hope CTL could draft from it', level: 'major', note: 'In this call, CTL helps shape, review, and produce your content, and faculty draft it. Projects that need CTL to write the content usually need a different arrangement and a longer timeline. Contact us to talk it through.', link: ['#commitment', 'Review how you and CTL share the work'] }
      ] },
    { id: 'time', q: 'Can you (and any collaborators) commit 9 to 12 months beginning mid-March 2027?', help: 'Plan on about 82 to 212 hours per Course, or roughly 2 to 5 hours a week for each Course lead.',
      options: [
        { label: 'Yes', level: 'ready', note: 'Your availability fits the development window.' },
        { label: 'Yes, but we’d need to start later', level: 'address', note: 'The form lets you describe a later start. This call is also identifying a shortlist of Specializations for development in 2028.' },
        { label: 'No, not in that window', level: 'major', note: 'Availability is strongly considered in review. If your schedule changes, or you’d like to be considered for a later cycle, contact us.' }
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

    r.appendChild(el('p', 'fit-help', 'Before you submit, talk with your dean about your proposal. Award letters go to both you and your dean, and both of you will be asked to accept.'));

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
