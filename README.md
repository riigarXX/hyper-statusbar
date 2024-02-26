# Hyper Terminal Plugin: hyper-statusbar

[![NPM](https://img.shields.io/npm/v/hyper-statusbar?style=flat\&logo=npm\&label=hyper-statusbar\&labelColor=F38BA8\&color=F38BA8\&logoColor=black)](https://www.npmjs.com/package/hyper-statusbar)\
[![GitHub release (latest by date including pre-releases)](https://img.shields.io/badge/release-FFADAD?include_prereleases\&style=flat\&logo=github\&labelColor=F38BA8\&label=release\&color=FFADAD\&logoColor=black)](https://github.com/riigarXX/hyper-statusbar/releases)\
[![GitHub last commit](https://img.shields.io/github/last-commit/riigarXX/hyper-statusbar?style=flat\&logo=github\&labelColor=FFD6A5\&label=last_commit\&color=FFD6A5\&logoColor=black)](https://github.com/riigarXX/hyper-statusbar/commits)\
[![GitHub stars](https://img.shields.io/github/stars/riigarXX/hyper-statusbar?style=flat\&logo=github\&labelColor=FDFFB6\&label=stars\&color=FDFFB6\&logoColor=black)](https://github.com/riigarXX/hyper-statusbar/stargazers)\
[![GitHub forks](https://img.shields.io/github/forks/riigarXX/hyper-statusbar?style=flat\&logo=github\&labelColor=CAFFBF\&label=forks\&color=CAFFBF\&logoColor=black)](https://github.com/riigarXX/hyper-statusbar/network/members)\
[![Downloads](https://img.shields.io/npm/dt/hyper-statusbar?style=flat\&logo=npm\&labelColor=A7FFEB\&label=downloads\&color=A7FFEB\&logoColor=black)](https://www.npmjs.com/package/hyper-statusbar)

## Overview

Elevate your Hyper terminal experience with the Hyper Statusbar plugin. This sleek addition provides essential information right at your fingertips.

### Key Features

* **Branch Awareness:** Stay in the loop with your current Git branch and any pending changes.
* **User Identification:** Instantly know whether you're logged in as a regular user or root.
* **Directory Display:** Keep track of your current working directory.
* **Time and Date:** Never lose track of time with a convenient timestamp, complete with a weekend indicator (palm tree icon).
* **Color Themes:** Choose from a variety of vibrant color themes to match your style.

## Usage

### Installation

Modify your `.hyper.js` file and add our plugin to the plugins array: `hyper-statusbar`.

```javascript
// ~/.hyper.js
module.exports = {
  ...your hyper.is config
  plugins: [
    "hyper-statusbar"
  ],
};
```

## Customization

Customize the appearance of your Hyper terminal's status bar to match your preferences.

```javascript
// ~/.hyper.js
module.exports = {
  config: {
    statusbar: {
      fontFamily: "CaskaydiaCove Nerd Font",
      theme: "palenight", // Example theme, choose your favorite from the list
    },
  },
  plugins: ["hyper-statusbar"],
};
```

## Screenshots / Usage

<details>
<summary>View Screenshots</summary>

Explore different themes with the Hyper Statusbar plugin:

### Ayu Theme

![Ayu Theme](screenshots/ayu_theme_screenshot.png)

### Tomorrow Night Theme

![Tomorrow Night Theme](screenshots/tomorrow_night_theme_screenshot.png)

### Solarized Dark Theme

![Solarized Dark Theme](screenshots/solarized_dark_theme_screenshot.png)

### Palenight Theme

![Palenight Theme](screenshots/palenight_theme_screenshot.png)

### One Dark Theme

![One Dark Theme](screenshots/one_dark_theme_screenshot.png)

### Oceanic Next Theme

![Oceanic Next Theme](screenshots/oceanic_next_theme_screenshot.png)

### Nord Theme

![Nord Theme](screenshots/nord_theme_screenshot.png)

### Gruvbox Theme

![Gruvbox Theme](screenshots/gruvbox_theme_screenshot.png)

### Dracula Theme

![Dracula Theme](screenshots/dracula_theme_screenshot.png)

### Cattpuccin Theme

![Cattpuccin Theme](screenshots/cattpuccin_theme_screenshot.png)

</details>

## Let's Wrap It Up!

Congratulations on discovering Hyper Statusbar, your trusty companion in the world of terminal customization! With Hyper Statusbar, you're not just customizing your terminal – you're crafting your own cozy corner of the coding universe.

Got questions, ideas, or just want to say hi? We're all ears! Swing by our [GitHub page](https://github.com/riigarXX/hyper-statusbar) and join the conversation. Together, let's make coding a little more colorful and a lot more fun!

Happy coding, friend! ✨

With love from riigarXX 💖

![PugDalf](images/pugdalf.webp)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
