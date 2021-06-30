export default [
    {
        version: '0.0.0',
        updateName: 'Initial Release',
        added: ['Basic setup for the normal game', 'Very very little changes from preact', 'Stole a *lot* from grayshift/bootstrap'],
        changed: [],
        fixed: [],
        removed: [],
    },{
        version: '0.0.1',
        updateName: "Unofficial Release #1 (commit 3)",
        added: ['Added a timer'],
        changed: ['Some style options, like button colors', 'Updated the info about the game to the left'],
        fixed: ["The 'hint' button doesn't win the game anymore"],
        removed: []
    },{
        version: '0.1.0',
        updateName: 'First Patch!',
        added: [],
        changed: [
            'text selection is now purple cause I like it :)',
            'version bump'
        ],
        fixed: [
            'old typescript version caused a lot of errors with build',
            'timer now stops when the game is finished (smh)',
            'the title is now actually good'
        ],
        removed: [
            'removed tests from the build proccess',
        ],
    },{
        version: '0.1.1',
        updateName: 'Unofficial Release #2 (commit on June 4th)',
        added: [
            'This site will now have an embed on the different pages',
            "'r' for quick restart",
            "Added shortcuts for q-e, a-d, z-c (for the left 3 columns)",
            "New favicons! Now they aren't the default ones from preact haha"
        ],
        changed: [
            "The card's spacing has been changed, it looks prettier",
            "handleSetSelection now doesn't use the button event, which makes the hint button a lot better",
        ],
        fixed: [
            "The timer uses setState rather than force update",
            "the win screen is now spaced out propperly"
        ],
        removed: [
            "unnecessary comments in the code",
            "unnecessary code has been removed",
        ],
    },{
        version: '0.1.2',
        updateName: 'Unofficial Release #3 (commit on June 6th)',
        added: [],
        changed: [
            "SvgDefs is now a thing, and isn't causing any more issues (like random padding on top)",
            "Changed the information col",
            "Now doesn't use a table layout, it uses flexbox (yahoo, I wish for death now)",
        ],
        fixed: [
            'Minimum height has been updated',
            'badCode.json has been removed, theres a better/less dumb solution lmao',
            "fixed favicons... I'm dumb"
        ],
        removed: [
            "A start for the removal of grayshift",
        ],
    },{
        version: '0.1.3',
        updateName: 'Unofficial Release #4 (commit on June 7th)',
        added: [
            "what I called 'efficiancy'"
        ],
        changed: [
            "Edited the margin, now it should be looking better",
            "The board doesn't get updated every second now, it uses board cache",
            "Changed styles for the weird cards",
            "Now on mobile it isn't landscape by default",
            "very slight changes for the css (selected glow is now smaller, margins & proportions)"
        ],
        fixed: [
            "Dumb code and workarounds",
            ".gitignore now has the build dir, and ignores the size plugin",
            "refresh through ctrl+r now doesn't cause massive pain",
            "cleaned up some bad code",
            "the cards have a better system"
        ],
        removed: [
        ],
    },{
        version: '0.1.4',
        updateName: 'Unofficial Release #5 (commit on June 8th)',
        added: [
        ],
        changed: [
            "Changed sizes for cards",
            "easier to make set cards (1 component)",
            "potential fix for build being dumb"
        ],
        fixed: [
            "The help menu doesn't restart the game",
            "Removed some bad code",
            "The cards scale better, should be better for mobile"
        ],
        removed: [
        ],
    },{
        version: '0.1.5',
        updateName: 'Unofficial Release #6 (commit on June 9th)',
        added: [
        ],
        changed: [
            ""
        ],
        fixed: [
            "The endgame logic is more efficiant, and now the the cards move to the right place"
        ],
        removed: [
        ],
    },{
        version: '0.5.0',
        updateName: 'Speedrun Update!',
        added: [
            'A livesplit ripoff',
            "Toggle clock button",
            "Change clock type button (begginer/expert)"
        ],
        changed: [
            "Global time format tool is used now"
        ],
        fixed: [
            ""
        ],
        removed: [
            "Support for mobile (temp)",
            "Unused imports removed",
            "timer from the left col"
        ],
    },{
        version: "0.5.1",
        updateName: "Fixes!",
        added: [
            'dependencies added, getting ready for a propper site, not just a web app :D',
        ],
        changed: [],
        fixed: [
            "Hopefully a fix for Apple devices have a negative 1 time",
            "Actual drop support for mobile. Now has ability to split these 2 apps"
        ],
        removed: []
    },{
        version: "0.6.0",
        updateName: "Transition to a propper site",
        added: [
            'An Index page',
            'A changelog page',
            'added preact/debug to the index, so now you can use the debug extension for preact ^^'
        ],
        changed: [
            'The help page is a seperate page, no more mid game help :>',
            "Some vulnerabilities fixed (npm audit fix)",
            "The project structure is now more organised",
            "Most of the css has been split apart into different files"
        ],
        fixed: [
            'Now almost all the code is more up to spec according to eslint ^^',
            'Capital letter should now not affect the shortcuts'
        ],
        removed: [

        ]
    },
]