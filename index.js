
const os = require("os")
const { exec } = require('child_process');
const afterAll = require('after-all-results');
const { themes } = require("./themes/index.js")
const { getHours, isRootUser, getDayOfWeek, getDirectoryNameFormated } = require('./helpers/index.js')


module.exports.decorateConfig = (config) => {
  const theme = config.statusbar.theme || false
  const themeSelected = themes[config.statusbar.theme] || false
  const configColors = themes[theme ? (themeSelected ? theme : "cattpuccin") : "cattpuccin"];

  const hyperStatusBar = Object.assign({
    fontFamily: "CaskaydiaCove Nerd Font",
    backgroundColor: false,
    gitColor: configColors.gitColor,
    branchBackgroundColor: configColors.branchBackgroundColor,
    branchColor: configColors.branchColor,
    calendarsColor: configColors.calendarsColor,
    directoryColor: configColors.directoryColor,
    basicUserColor: configColors.basicUserColor,
    rootUserColor: configColors.rootUserColor,
    informationPillColor: configColors.informationPillColor
  }, config.statusbar)

  return Object.assign({}, config, {
    css: `
      .hyper-status-bar {
        display: flex;
        justify-content:space-between;
        align-items: center;
        padding: 5px;
        background-color: ${hyperStatusBar.backgroundColor};
        color: #cdd6f4;
        font-family: "${hyperStatusBar.fontFamily}";
        font-size: 17px;
        margin-top:30px;
      }
      .menu {
        display:flex;
      }
      .menu  div {
        padding:2px 10px;
        margin-right:5px;
      }
      .menu div > span:first-child {
        border-radius:8px 0px 0px 8px;
        padding-left:10px;
        color:black !important;

      }
      .calendars {
        background-color:${hyperStatusBar.calendarsColor};
      }
      .directories{
        background-color:${hyperStatusBar.directoryColor};
      }
      .admin-user {
        background-color: ${hyperStatusBar.rootUserColor};
      }
      .basic-user{
        background-color: ${hyperStatusBar.basicUserColor};
      }
      .branchs {
        background-color:${hyperStatusBar.gitColor};
      }
      .branchText {
        background-color:${hyperStatusBar.branchBackgroundColor};
        color:${hyperStatusBar.branchColor}
        padding-left:10px;
      }
      .menu div > span:last-child {
        border-radius:0px 8px 8px 0px;
        background-color:${hyperStatusBar.informationPillColor};
        padding-right:10px;
        padding-left:10px;
      }
    `
  });
}

module.exports.onWindow = browserWindow => {
  browserWindow.webContents.on('did-finish-load', () => {
    browserWindow.webContents.insertCSS(`
      .terms_termsNotShifted.jsx-3986690196 {
        height: calc(100% - 30px) !important;
        top:30px !important;
      }
    `);
  });
};
let pid;
let cwd;
let cwdName;
let hour;
let nameDayOfWeek;
let git = {
  branch: '',
  remote: '',
  dirty: 0,
  ahead: 0
}
const setCwd = (pid, action) => {
  if (process.platform == 'win32') {
    exec("cd", (err, stdout) => {
      cwdName = getDirectoryNameFormated(stdout.trim())
      cwd = stdout.trim();
      setGit(cwd);
    })
  } else {
    exec(`lsof -p ${pid} | awk '$4=="cwd"' | tr -s ' ' | cut -d ' ' -f9-`, (err, stdout) => {
      cwdName = getDirectoryNameFormated(stdout.trim())
      cwd = stdout.trim()
      setGit(cwd);
    });
  }

};

const isGit = (dir, cb) => {
  exec(`git rev-parse --is-inside-work-tree`, { cwd: dir }, (err) => {
    cb(!err);
  });
}

const gitBranch = (repo, cb) => {
  exec(`git symbolic-ref --short HEAD || git rev-parse --short HEAD`, { cwd: repo }, (err, stdout) => {
    if (err) {
      return cb(err);
    }

    cb(null, stdout.trim());
  });
}

const gitRemote = (repo, cb) => {
  exec(`git ls-remote --get-url`, { cwd: repo }, (err, stdout) => {
    cb(null, stdout.trim().replace(/^git@(.*?):/, 'https://$1/').replace(/[A-z0-9\-]+@/, '').replace(/\.git$/, ''));
  });
}

const gitDirty = (repo, cb) => {
  exec(`git status --porcelain --ignore-submodules -uno`, { cwd: repo }, (err, stdout) => {
    if (err) {
      return cb(err);
    }

    cb(null, !stdout ? 0 : parseInt(stdout.trim().split('\n').length, 10));
  });
}

const gitAhead = (repo, cb) => {
  exec(`git rev-list --left-only --count HEAD...@'{u}' 2>/dev/null`, { cwd: repo }, (err, stdout) => {
    cb(null, parseInt(stdout, 10));
  });
}

const gitCheck = (repo, cb) => {
  const next = afterAll((err, results) => {
    if (err) {
      return cb(err);
    }
    const branch = results[0];
    const remote = results[1];
    const dirty = results[2];
    const ahead = results[3];

    cb(null, {
      branch: branch,
      remote: remote,
      dirty: dirty,
      ahead: ahead
    });
  });

  gitBranch(repo, next());
  gitRemote(repo, next());
  gitDirty(repo, next());
  gitAhead(repo, next());
}

const setGit = (repo) => {
  isGit(repo, (exists) => {
    if (!exists) {
      git = {
        branch: '',
        remote: '',
        dirty: 0,
        ahead: 0
      }

      return;
    }

    gitCheck(repo, (err, result) => {
      if (err) {
        throw err;
      }

      git = {
        branch: result.branch,
        remote: result.remote,
        dirty: result.dirty,
        ahead: result.ahead
      }
    })
  });
}
module.exports.decorateHyper = (Hyper, { React }) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cwd: '',
        cwdName: '',
        hour: '',
        branch: '',
        remote: '',
        dirty: 0,
        ahead: 0
      }
    }

    componentDidMount() {
      this.interval = setInterval(() => {
        this.setState({
          cwd: cwd,
          cwdName: cwdName,
          hour: hour,
          nameDayOfWeek: nameDayOfWeek,
          branch: git.branch,
          remote: git.remote,
          dirty: git.dirty,
          ahead: git.ahead,
        });
      }, 100);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      const existingChildren = this.props.customInnerChildren || [];
      // Renderiza la barra de estado
      const header = React.createElement('div', { className: 'hyper-status-bar' }, [
        React.createElement('div', { className: "menu", key: "left-menu" }, [

          this.state.branch !== "" ? (
            React.createElement('div', { className: '', key: 'branch' },

              React.createElement('span', { className: 'branchs', key: "branchIcon" },
                " "
              ),
              React.createElement('span', { className: "branchText", key: "branchText" },
                `${this.state.branch}`
              ),
              React.createElement('span', { className: "branchChanges", key: "branchChanges" },
                `${this.state.dirty}  `
              )
            )
          ) : "",

          React.createElement('div', { className: '', key: 'directory' },

            React.createElement('span', { className: `${isRootUser() ? 'admin-user' : 'basic-user'}`, key: "directoryIcon" },
              ` ${isRootUser() ? ' ' : ' '}`
            ),
            React.createElement('span', { className: "directoryText", key: "directoryText" },
              `${os.userInfo().username}`
            )
          ),
        ]),
        React.createElement('div', { className: "menu", key: "right-menu" }, [

          React.createElement('div', { className: 'directory', key: 'directory' },

            React.createElement('span', { className: "directories", key: "directoryIcon" },
              `󰉋 `
            ),
            React.createElement('span', { className: "directoryText", key: "directoryText" },
              `${this.state.cwdName}`
            )
          ),
          React.createElement('div', { className: 'isWorkingHours', key: 'calendar' },

            React.createElement('span', { className: "calendars", key: "isWorkingHoursIcon" },
              `󰻗 `
            ),
            React.createElement('span', { className: "isWorkingHoursText", key: "isWorkingHoursText" },
              `${this.state.nameDayOfWeek}`
            )
          ),
          React.createElement('div', { className: 'isWorkingHours', key: 'isWorkingHours' },

            React.createElement('span', { className: "calendars", key: "isWorkingHoursIcon" },
              `󰃰 `
            ),
            React.createElement('span', { className: "isWorkingHoursText", key: "isWorkingHoursText" },
              `${this.state.hour}`
            )
          ),
        ])
      ])
      return React.createElement('div', { className: 'hyper-container' }, [
        React.createElement(Hyper, Object.assign({}, this.props, {
          customInnerChildren: existingChildren.concat(header)
        }))
      ]);
    }
  };
};
exports.middleware = (store) => (next) => (action) => {
  const uids = store.getState().sessions.sessions;

  switch (action.type) {
    case 'SESSION_SET_XTERM_TITLE':
      pid = uids[action.uid].pid;
      break;

    case 'SESSION_ADD':
      pid = action.pid;
      setCwd(pid);
      hour = getHours()
      nameDayOfWeek = getDayOfWeek()
      break;

    case 'SESSION_ADD_DATA':
      const { data } = action;
      const enterKey = data.indexOf('\n') > 0;

      if (enterKey) {
        setCwd(pid, action);
        hour = getHours()
        nameDayOfWeek = getDayOfWeek()
      }
      break;

    case 'SESSION_SET_ACTIVE':
      pid = uids[action.uid].pid;
      setCwd(pid);
      hour = getHours()
      nameDayOfWeek = getDayOfWeek()
      break;
  }

  next(action);
};
