document.documentElement.classList.add('github-thame');
if (document.body) document.body.classList.add('github-thame');

let is_done = false;


function startup_stuff() {
  if (document.body) {
    document.body.classList.add('github-thame');
    document.body.classList.remove('christmas-theme');
    document.body.removeAttribute('data-controller');
  }

  let tmp = document.querySelector('.explore');
  const kit = document.querySelector('.kitchen-index');
  const ach = document.querySelector('.achievements');
  const shp = document.querySelector('.shop');
  const gllry = document.querySelector('.gallery');
  const vts = document.querySelector('.votes');
  const prjs = document.querySelector('.projects') || document.querySelector('.projects-board');
  const prj_shw = document.querySelector('.projects-show')

  const ldr = (document.querySelector('main h1')?.textContent.includes('Leaderboard')) ? document.querySelector('main') : null;
  const prof = document.querySelector('.user-profile');


  if (prof && !prof.querySelector('.user-profile__activity')) {
    return;
  }

  if (kit && !kit.querySelector('.kitchen-setup')) {
    return;
  }

  if (!tmp && kit) tmp = kit;
  if (!tmp && ach) tmp = ach;
  if (!tmp && shp) tmp = shp;
  if (!tmp && gllry) tmp = gllry;
  if (!tmp && vts) tmp = vts;
  if (!tmp && prjs) tmp = prjs;
  if (!tmp && ldr) tmp = ldr;
  if (!tmp && prof) tmp = prof;
  if (!tmp && prj_shw) tmp = prj_shw;


  document.querySelectorAll('dialog').forEach(d => {
    if (d.parentElement !== document.body) {


      document.body.appendChild(d);


      d.addEventListener('click', (e) => {
        if (e.target === d) d.close();
      });
    }
  });


  if (!tmp) return;
  if (tmp.querySelector('.gt-container')) return;

  let nav = document.querySelector('.explore__nav');
  const list = document.querySelector('#devlog-list');
  const p_list = document.querySelector('#project-list') || document.querySelector('.projects-board__grid');

  if (!nav && (kit || ach || shp || gllry || vts || prjs || ldr || prof || prj_shw)) {
    nav = document.createElement('div');
    nav.className = 'explore__nav';
    const is_achieve = !!ach;
    const is_leader = !!ldr;

    if (prjs || prj_shw) {
      nav.innerHTML = '';
    } else {
      nav.innerHTML = `
        <a class="explore__nav-component ${(!is_achieve && !is_leader) ? 'selected' : ''}" href="/kitchen">
          Kitchen
        </a>
        <a class="explore__nav-component ${is_achieve ? 'selected' : ''}" href="/my/achievements">
          Achievements
        </a>
        <a class="explore__nav-component ${is_leader ? 'selected' : ''}" href="/leaderboard">
          Leaderboard
        </a>
      `;
    }
  }


  if (!nav && !prj_shw) return;
  if (!list && !p_list && !kit && !ach && !shp && !gllry && !vts && !prjs && !ldr && !prof && !prj_shw) return;



  const tab = Array.from(nav.querySelectorAll('a')).find(a => a.textContent.includes('Following'));
  if (tab) tab.remove();


  const icons = {
    'Devlogs': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    'Gallery': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`,
    'Extensions': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>`,
    'Kitchen': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.015 3.055a1 1 0 0 1 1.26 1.548l-.098.079-2.101 1.501a1.96 1.96 0 0 0-.794 1.937l.032.152 3.343-3.343a1 1 0 0 1 1.497 1.32l-.083.094-3.343 3.343c.705.18 1.485-.04 1.986-.63l.103-.132 1.501-2.101a1 1 0 0 1 1.694 1.055l-.067.107-1.5 2.102a3.97 3.97 0 0 1-5.054 1.216l-.18-.1-2.297 2.296 4.157 4.158a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083-4.157-4.158-4.157 4.158a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094 4.157-4.158-1.61-1.61a4.5 4.5 0 0 1-1.355.473l-.25.037a3.89 3.89 0 0 1-3.279-1.15C2.663 10.319 2.132 9.15 2 8.027c-.13-1.105.12-2.289.93-3.098.809-.81 1.992-1.06 3.097-.93 1.123.133 2.293.664 3.222 1.593a3.89 3.89 0 0 1 1.15 3.278c-.06.505-.207.984-.406 1.401l-.104.204 1.61 1.61 2.298-2.296a3.97 3.97 0 0 1 .944-5.103l.172-.13z"></path></svg>`,
    'Achievements': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4h7.6l-6.2 4.6 2.4 7.4-6.2-4.6-6.2 4.6 2.4-7.4-6.2-4.6h7.6z"/></svg>`,
    'Leaderboard': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 21H3v-2h18v2zM5 19h3V7H5v12zm11-6h3V5h-3v12zm-5.5 6h3V9h-3v10z"/></svg>`,
    'My Orders': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`
  };

  if (shp && nav) {
    nav.innerHTML = '';
    const s_btns = shp.querySelector('.shop__buttons');
    if (s_btns) {
      const ord_link = s_btns.querySelector('a[href*="my_orders"]');
      if (ord_link) {
        const nl = document.createElement('a');
        nl.className = 'explore__nav-component';
        nl.href = ord_link.href;
        nl.textContent = 'My Orders';
        nav.appendChild(nl);
      }
      const reg_drop = s_btns.querySelector('.dropdown');
      if (reg_drop) {
        const dw = document.createElement('div');
        dw.style.padding = '8px 16px';

        reg_drop.classList.add('gt-github-dropdown');


        reg_drop.style.width = '100%';
        reg_drop.style.display = 'block';

        const d_btn = reg_drop.querySelector('.dropdown__button');
        if (d_btn) {
          d_btn.style.width = '100%';
          d_btn.style.textAlign = 'left';
          d_btn.style.background = 'transparent';
          d_btn.style.border = '1px solid #30363d';
          d_btn.style.borderRadius = '6px';
          d_btn.style.color = '#c9d1d9';
          d_btn.style.padding = '6px 12px';
          d_btn.style.display = 'flex';
          d_btn.style.alignItems = 'center';
          d_btn.style.justifyContent = 'space-between';
        }

        reg_drop.querySelectorAll('.dropdown__item').forEach(it => {
          it.addEventListener('click', () => {
            setTimeout(() => {
              if (d_btn) d_btn.click();
            }, 50);
          });
        });

        dw.appendChild(reg_drop);
        nav.appendChild(dw);
      }
      s_btns.style.display = 'none';
    }
  }

  nav.querySelectorAll('.explore__nav-component').forEach(a => {
    const txt = a.textContent.trim();
    if (icons[txt]) {
      const old = a.querySelector('svg');
      const temp = document.createElement('div');
      temp.innerHTML = icons[txt];
      const new_icon = temp.firstChild;

      if (old) old.replaceWith(new_icon);
      else a.prepend(new_icon);
    }
  });

  const m_wrap = document.createElement('div');
  m_wrap.className = 'gt-container';

  const l_side = document.createElement('div');
  l_side.className = 'gt-left';
  if (nav) l_side.appendChild(nav);

  if (prjs) {
    const createBtn = document.createElement('a');
    createBtn.className = 'gt-create-btn';
    createBtn.href = '/projects/new';
    createBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      <span>Create Project</span>
    `;
    l_side.appendChild(createBtn);
  }

  const m_col = document.createElement('div');
  m_col.className = 'gt-mid';
  const hdr = document.createElement('div');
  hdr.className = 'gt-feed-header';

  const cur = nav.querySelector('.selected')?.textContent.trim() || 'Feed';
  if (!prof) {
    hdr.innerHTML = `<h2>${cur}</h2>`;
    m_col.appendChild(hdr);
  }


  if (p_list) {
    const prjcards = p_list.querySelectorAll('.project-card');
    prjcards.forEach(card => {
      const newcard = make_card(card);
      m_col.appendChild(newcard);
      card.dataset.transformed = 'true';
    });

    p_list.style.display = 'none';
    m_col.appendChild(p_list);
  }
  else if (ldr) {
    const users = ldr.querySelector('.users');
    const subt = ldr.querySelector('.subtitle');
    if (subt) {
      const sp = document.createElement('div');
      sp.className = 'gt-leader-sub';
      sp.textContent = subt.textContent;
      m_col.appendChild(sp);
    }

    if (users) {
      Array.from(users.querySelectorAll('.user')).forEach(u => {
        const row = document.createElement('article');
        row.className = 'post gt-leader-row';
        const rank = u.querySelector('h2:first-child')?.textContent || '';
        const img = u.querySelector('img')?.src || '';
        const link = u.querySelector('h2:last-of-type a');
        const cookies = u.querySelector('p')?.textContent || '';

        row.innerHTML = `
          <div class="gt-leader-rank">${rank}</div>
          <div class="gt-leader-content">
            <img src="${img}" class="gt-leader-avatar">
            <div class="gt-leader-info">
              <a href="${link?.href || '#'}" class="gt-leader-name">${link?.textContent || 'Chef'}</a>
              <div class="gt-leader-cookies">${cookies}</div>
            </div>
          </div>
        `;
        m_col.appendChild(row);
      });
    }
    const pag = ldr.querySelector('.pagination');
    if (pag) m_col.appendChild(pag);
  }
  else if (kit || ach || shp || gllry || vts || prjs) {
    const main = kit || ach || shp || gllry || vts || prjs;
    const k_content = document.createElement('div');
    k_content.className = 'gt-kitchen-wrap';

    Array.from(main.children).forEach(child => {
      if (child.className !== 'gt-container') {
        k_content.appendChild(child);
      }
    });

    m_col.appendChild(k_content);

    if (shp) {
      const g_cont = document.querySelector('.shop-goals__container');
      if (g_cont) {
        g_cont.style.display = 'block';
      }

      const s_nav = k_content.querySelector('.shop__nav');
      if (s_nav) {
        const search = s_nav.querySelector('.shop__searchbar');
        const filters = s_nav.querySelector('.shop__filters');

        if (search && filters) {
          s_nav.insertBefore(search, s_nav.firstChild);
        }

        if (filters) {
          filters.querySelectorAll('.dropdown').forEach(d => {
            d.classList.add('gt-github-filter');
          });
        }
      }
    }

    main.classList.add('gt-ready');
  }
  else if (prof) {
    if (is_done) return
    is_done = true

    const p_wrap = document.createElement('div');
    p_wrap.className = 'gt-profile-wrap';

    const s_bar = document.createElement('div');
    s_bar.className = 'gt-profile-sidebar';

    const p_main = document.createElement('div');
    p_main.className = 'gt-profile-main';


    const name = prof.querySelector('.user-profile__identity h1')?.textContent || 'User';
    const joined = prof.querySelector('.user-profile__identity h2')?.textContent || '';
    const avatar = prof.querySelector('.user-profile__avatar')?.src || '';


    s_bar.innerHTML = `
      <div class="gt-profile-identity">
        <img src="${avatar}" class="gt-profile-avatar-large">
        <h1 class="gt-profile-name">${name}</h1>
        <div class="gt-profile-joined">${joined}</div>
      </div>
      <div class="gt-profile-stats-sidebar"></div>
      <div class="gt-profile-achievements-sidebar">
        <h3>Achievements</h3>
        <div class="gt-achieve-grid-small"></div>
      </div>
    `;


    const stats = prof.querySelectorAll('.user-profile__stat');
    const s_grid = s_bar.querySelector('.gt-profile-stats-sidebar');
    stats.forEach(s => {
      const val = s.querySelector('h4')?.textContent || '0';
      const lbl = s.querySelector('h3')?.textContent || '';
      s_grid.innerHTML += `
        <div class="gt-sidebar-stat">
          <span class="gt-sidebar-stat-val">${val}</span>
          <span class="gt-sidebar-stat-label">${lbl}</span>
        </div>
      `;
    });




    const times = prof.querySelectorAll('.user-profile__time');
    times.forEach(t => {
      const lbl = t.querySelector('h4:first-child')?.textContent || '';
      const val = t.querySelector('h4:last-child')?.textContent || '';
      if (lbl && val) {
        s_grid.innerHTML += `
          <div class="gt-sidebar-stat" style="width: 100% !important;">
            <span class="gt-sidebar-stat-label">${lbl}</span>
            <span class="gt-sidebar-stat-val">${val}</span>
          </div>
        `;
      }
    });


    const achs = prof.querySelectorAll('.user-profile__achievement');
    const ach_grid = s_bar.querySelector('.gt-achieve-grid-small');
    achs.forEach(ach => {
      const icon = ach.querySelector('.user-profile__achievement-icon')?.innerHTML || '';
      const title = ach.querySelector('.user-profile__achievement-title')?.textContent || '';
      if (icon.includes('src') || icon.includes('svg')) {
        ach_grid.innerHTML += `<div class="gt-achieve-badge" title="${title}">${icon}</div>`;
      }
    });


    const stat_vals = prof.querySelectorAll('.user-profile__stat h4');
    const p_count = stat_vals[1]?.textContent || '0';

    p_main.innerHTML = `
      <div class="gt-profile-tabs">
        <button class="gt-prof-tab active" data-tab="activity">Overview</button>
        <button class="gt-prof-tab" data-tab="projects">Repositories <span class="gt-badge">${p_count}</span></button>
      </div>
      <div class="gt-tab-content" id="gt-tab-activity" style="display: block;"></div>
      <div class="gt-tab-content" id="gt-tab-projects" style="display: none;"></div>
    `;

    const a_tab = p_main.querySelector('#gt-tab-activity');
    const act_src = prof.querySelector('.user-profile__activity div[style*="grid"]');
    if (act_src) a_tab.appendChild(act_src);

    const prj_tab = p_main.querySelector('#gt-tab-projects');
    const prj_src = prof.querySelector('.user-profile__projects');
    if (prj_src) {
      prj_tab.appendChild(prj_src);
    }

    p_wrap.appendChild(s_bar);
    p_wrap.appendChild(p_main);
    m_col.appendChild(p_wrap);

    p_main.querySelectorAll('.gt-prof-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        p_main.querySelectorAll('.gt-prof-tab').forEach(b => b.classList.remove('active'))

        p_main.querySelectorAll('.gt-tab-content').forEach(c => {
          c.classList.remove('active')
          c.style.display = 'none'
        })

        btn.classList.add('active')
        const t = p_main.querySelector('#gt-tab-' + btn.dataset.tab)
        if (t) {
          t.classList.add('active')
          t.style.display = 'block'
        }
      })
    })

    prof.classList.add('gt-ready')
  }
  else if (prj_shw) {
    const sh_cont = prj_shw.querySelector('.projects-show__container')
    if (sh_cont) {
      const card = sh_cont.querySelector('.project-show-card')
      if (card) {
        const art = document.createElement('article')
        art.className = 'post project-show-post'

        const bnr = card.querySelector('.project-card__banner-image')
        const title = card.querySelector('.project-show-card__title-text')?.textContent || ''
        const byline = card.querySelector('.project-show-card__byline')?.textContent || ''
        const desc = card.querySelector('.project-show-card__description')?.innerHTML || ''
        const acts = card.querySelector('.project-show-card__actions')?.innerHTML || ''
        const adm = card.querySelector('.projects-show__admin-actions')?.innerHTML || ''
        const stats = card.querySelector('.project-show-card__stats')?.innerHTML || ''

        let b_html = ''
        if (bnr) {
          b_html = `<div class="gt-proj-banner"><img src="${bnr.src}"></div>`
        }

        art.innerHTML = `  
                ${b_html}
                <div class="gt-proj-content">
                  <div class="gt-proj-header-row">
                    <h1 class="gt-proj-title-big">${title}</h1>
                    <div class="gt-proj-admin">${adm}</div>
                  </div>
                  <div class="gt-proj-byline">${byline}</div>      
                  <div class="gt-proj-desc-full">${desc}</div>
                  <div class="gt-proj-links">${acts}</div>
                </div>
              `


        m_col.appendChild(art)
      }

      const timeline = prj_shw.querySelector('.projects-show__timeline')
      const tl_btns = prj_shw.querySelector('.mt-4')

      if (tl_btns && !tl_btns.classList.contains('projects-show__timeline')) {
        m_col.appendChild(tl_btns)
      }

      if (timeline) {
        const tl_wrap = document.createElement('div')
        tl_wrap.className = 'gt-timeline-wrap'
        tl_wrap.appendChild(timeline)
        m_col.appendChild(tl_wrap)
      }
    }
  }
  else {
    if (list) m_col.appendChild(list);
  }

  const r_side = document.createElement('div');
  r_side.className = 'gt-right';

  const is_ext = cur === 'Extensions';

  if (is_ext) {
    r_side.innerHTML = `
      <div class="gt-sidebar-card">
        <h3>Extensions</h3>
        <p style="color: #8b949e; font-size: 0.9rem; margin-bottom: 16px;">Projects that integrate with Flavortown, shown by usage. At least 2 weekly users needed to show up.</p>
        <details class="gt-ext-details" open>
          <summary style="cursor: pointer; font-weight: 500; margin-bottom: 8px;">How to register your extension</summary>
          <div style="padding-left: 8px;">
            <p style="font-size: 0.85rem; color: #8b949e; margin: 8px 0;">Add a header to your HTTP requests identifying your project:</p>
            <code style="display: block; background: #0d1117; border: 1px solid #30363d; border-radius: 4px; padding: 8px; font-size: 0.8rem; margin: 8px 0;">X-Flavortown-Ext-{project_id}: true</code>
            <p style="font-size: 0.85rem; color: #8b949e; margin: 8px 0;">For example, if your project ID is <strong>42</strong>:</p>
            <code style="display: block; background: #0d1117; border: 1px solid #30363d; border-radius: 4px; padding: 8px; font-size: 0.8rem; margin: 8px 0;">X-Flavortown-Ext-42: true</code>
          </div>
        </details>
      </div>
    `;
  } else if (shp) {
    r_side.innerHTML = `
      <div class="gt-sidebar-card" style="text-align: left !important;">
        <h3 style="color: #f0f6fc; margin-bottom: 12px;">Cookie Formula</h3>
        <p style="color: #8b949e; font-size: 0.9rem; margin-bottom: 12px;">The formula for the cookies is:</p>
        <div style="background: #161b22; padding: 12px; border-radius: 6px; border: 1px solid #30363d; margin-bottom: 12px; color: #c9d1d9; font-size: 0.9rem;">
          <strong>Hour Spent</strong> × <strong>1-30</strong> (Voting Score) = <strong>Cookies Earned</strong>
        </div>
        <p style="color: #8b949e; font-size: 0.85rem; font-style: italic;">* The voting starts after shipping your project.</p>
      </div>
    `;
  } else if (kit || ach) {
    if (ach) {
      r_side.innerHTML = `
        <div class="gt-sidebar-card">
          <h3 style="color: #f0f6fc; margin-bottom: 12px;">Collection Progress</h3>
          <p style="color: #8b949e; font-size: 0.85rem; line-height: 1.4; margin: 0;">
            Keep cooking and interacting with the community to get more cookies!
          </p>
        </div>
      `;
    } else {
      r_side.innerHTML = `
        <div class="gt-sidebar-card">
          <h3 style="color: #f0f6fc; margin-bottom: 16px;">Need any help?</h3>
          
          <div style="margin-bottom: 24px;">
            <h4 style="color: #adbac7; font-size: 0.95rem; margin-bottom: 8px;">Help channel on Slack</h4>
            <p style="color: #768390; font-size: 0.85rem; line-height: 1.4; margin-bottom: 12px;">
              If you're stuck, or have any questions about Flavortown join our Slack community and ask away in the #flavortown-help channel.
            </p>
            <a href="https://hackclub.slack.com/app_redirect?channel=C09MATKQM8C" target="_blank" 
               style="display: inline-flex; align-items: center; justify-content: center; background: #21262d; border: 1px solid #30363d; border-radius: 6px; padding: 6px 12px; color: #c9d1d9; font-size: 0.85rem; text-decoration: none; width: 100%;">
              Go to #flavortown-help
            </a>
          </div>

          <div>
            <h4 style="color: #adbac7; font-size: 0.95rem; margin-bottom: 8px;">Email support</h4>
            <p style="color: #768390; font-size: 0.85rem; line-height: 1.4; margin: 0;">
              If you're having issues with Slack (or just prefer email), you can send a message to 
              <a href="mailto:flavortown@hackclub.com" style="color: #58a6ff;">flavortown@hackclub.com</a>.
            </p>
          </div>
        </div>
      `;
    }
  }

  else if (prjs) {
    r_side.innerHTML = `
      <div class="gt-ideas-card">
        <h3>Cant thing of anything?</h3>
        <p>Order some ideas from our cooks - get silly ideas to make a fun project in a few hours!</p>
        <button class="gt-ideas-btn" onclick="document.querySelector('[data-action*=\\'project-ideas#toggle\\']')?.click()">Need Ideas?</button>
      </div>
    `;
  }

  else if (prj_shw) {
    const card = prj_shw.querySelector('.project-show-card')
    const stats_src = card?.querySelector('.project-show-card__stats')?.innerHTML || ''

    r_side.innerHTML = `
        <div class="gt-sidebar-card">
          <h3 style="color: #f0f6fc; margin-bottom: 12px;">About</h3>
          <p style="color: #8b949e; font-size: 0.9rem; margin-bottom: 20px;">
            This is a community project built in Flavortown. You can follow this project to get updates in your feed!
          </p>
          
          <div class="gt-side-stats" style="margin-bottom:24px; display: flex; flex-direction: column; gap: 12px;">
            ${stats_src}
          </div>

          <div style="border-top:1px solid #30363d; padding-top:16px;">
            <p style="font-size:0.8rem; color:#768390;">   
               Support the creator by leaving a like on their devlogs!    
            </p>   
          </div>
        </div>
      `
  }

  else {
    r_side.innerHTML = `
      <div class="gt-sidebar-card">
        <h3>Latest from your following projects</h3>
        <p><a href="/explore/following" style="color: inherit; text-decoration: underline;">see the projects that you follow here</a></p>
      </div>
    `;
  }



  if (!prj_shw) m_wrap.appendChild(l_side);
  m_wrap.appendChild(m_col);
  m_wrap.appendChild(r_side);

  if (prof) {
    m_wrap.classList.add('gt-full-width');
  }

  if (prj_shw) {
    m_wrap.classList.add('gt-no-sidebar');
  }

  const old_content = Array.from(tmp.children);
  tmp.innerHTML = '';
  tmp.appendChild(m_wrap);

  old_content.forEach(el => {
    if (el.hasAttribute('data-controller') && el.id !== 'project-list') {
      tmp.appendChild(el);
    }
  });


  if (!document.querySelector('.gt-topbar')) {
    const bar = document.createElement('div');
    bar.className = 'gt-topbar';

    const u_img = document.querySelector('.sidebar__user-avatar-placeholder');
    const u_name = document.querySelector('.sidebar__user-name')?.textContent || 'User';
    const u_link = document.querySelector('.sidebar__user-details a')?.href || '#';
    const src = u_img ? u_img.src : '';
    const avatar = u_img ? `<img src="${src}" class="gt-user-avatar">` : '<div class="gt-icon"></div>';

    bar.innerHTML = `
      <div class="gt-topbar-left">
        <div class="gt-logo"></div>
        <span class="gt-title">Dashboard</span>
      </div>
      <div class="gt-topbar-right">
        <a href="/kitchen" class="gt-nav-btn" title="Kitchen">
          <svg viewBox="0 0 448 512" fill="currentColor"><path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>
        </a>
        <a href="/explore" class="gt-nav-btn" title="Explore">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>
        </a>
        <a href="/projects" class="gt-nav-btn" title="Projects">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        </a>
        <a href="https://flavortown.hackclub.com/votes/new" class="gt-nav-btn" title="Vote">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 0 0 2-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 0 0 0 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 0 0 0-1.41L14.16 2.3a.975.975 0 0 0-1.4-.01z"/></svg>
        </a>
        <a href="/shop" class="gt-nav-btn" title="Shop">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </a>
        <div class="gt-profile-container">
          <div class="gt-user-profile">${avatar}</div>
          <div class="gt-dropdown" id="gt-profile-dropdown">
            <div class="gt-dropdown-header">
              <img src="${src}" class="gt-dropdown-avatar">
              <div class="gt-dropdown-user-info">
                <a href="${u_link}" class="gt-dropdown-username">${u_name}</a>
              </div>
            </div>
            <div class="gt-dropdown-divider"></div>
            <a href="#" class="gt-dropdown-item" id="gt-btn-balance">
              <span class="gt-dropdown-item-icon">🍪</span>
              Your Balance
            </a>
            <div class="gt-dropdown-divider"></div>
            <a href="#" class="gt-dropdown-item" id="gt-btn-settings">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"></path></svg>
              Settings
            </a>
            <a href="#" class="gt-dropdown-item" id="gt-btn-logout">
              <svg viewBox="0 0 24 24" fill="none" class="sidebar__user-logout-icon">
                <path d="M21 12L13 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              Sign out
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.insertBefore(bar, document.body.firstChild);

    const profl = bar.querySelector('.gt-user-profile');
    const dd = bar.querySelector('#gt-profile-dropdown');

    profl.addEventListener('click', (e) => {
      e.stopPropagation();
      dd.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dd.classList.remove('show');
    });

    bar.querySelector('#gt-btn-balance').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('balance-modal')?.showModal();
    });

    bar.querySelector('#gt-btn-settings').addEventListener('click', (e) => {
      e.preventDefault();

      document.getElementById('settings-modal')?.showModal();
    });

    bar.querySelector('#gt-btn-logout').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('logout-form')?.submit();
    });
  }
}














function make_card(card) {
  const newcard = document.createElement('article');
  newcard.className = 'post project-post';

  const bnr = card.querySelector('.project-card__banner-image');
  const t_link = card.querySelector('.project-card__title-link');
  const dsc = card.querySelector('.project-card__description p')?.textContent || '';
  const d_stat = card.querySelector('.project-card__stats h5:first-child')?.textContent.trim() || '';
  const t_stat = card.querySelector('.project-card__stats h5:last-child')?.textContent.trim() || '';

  let b_html = '';
  if (bnr) {
    b_html = `<div class="gt-proj-banner"><img src="${bnr.src}" alt="banner"></div>`;
  }

  newcard.innerHTML = `
    ${b_html}
    <div class="gt-proj-content">
      <h3 class="gt-proj-title"><a href="${t_link?.href || '#'}">${t_link?.textContent || 'Project'}</a></h3>
      <p class="gt-proj-desc">${dsc}</p>
      <div class="gt-proj-stats">
        <span>${d_stat}</span>
        <span>${t_stat}</span>

      </div>
    </div>
  `;
  return newcard;
}

const check_stuff = new MutationObserver(() => {
  document.querySelectorAll('canvas, .snow, #snow-canvas').forEach(el => el.remove());

  if (!document.querySelector('.gt-container')) {
    startup_stuff();
    return;
  }

  const m_col = document.querySelector('.gt-mid');
  const p_list = document.querySelector('#project-list') || document.querySelector('.projects-board__grid');
  if (m_col && p_list) {
    const list = p_list.querySelectorAll('.project-card');
    list.forEach(c => {
      if (!c.dataset.transformed) {
        const nc = make_card(c);
        const l_wrap = m_col.querySelector('[data-load-more-target="button"]')?.parentElement;
        if (l_wrap) {
          m_col.insertBefore(nc, l_wrap);
        } else {
          m_col.appendChild(nc);
        }
        c.dataset.transformed = 'true';
        c.style.display = 'none';
      }
    });
  }
});

check_stuff.observe(document.documentElement, {
  childList: true,
  subtree: true
});

window.addEventListener('load', startup_stuff);
window.addEventListener('DOMContentLoaded', startup_stuff);


for (let i = 1; i <= 10; i++) {
  setTimeout(startup_stuff, i * 700);
}
