import { A11ySection, DocsDoDont, DocsPrinciples, DocsProse } from './DocsGuide'
import { DocsInlineCode, DocsUsage } from './DocsCard'
import { Body } from './Text'

export const headingGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Heading is the page or section title. Display is a marketing hero. H1 is the page. H2 is a section. H3 is a
          card. Pass <DocsInlineCode>as</DocsInlineCode> when the visual size and the document outline
          disagree.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One H1', body: 'Each page has a single h1. Display also renders h1 — do not stack both.' },
          { title: 'Follow with subhead', body: 'A heading states the idea. Subhead supports it in one line.' },
          { title: 'Do not skip', body: 'H1 then H2 then H3. Never jump a level to get a smaller size.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use level={1} for the page title in product and docs.',
          'Use level="display" once, on a marketing hero.',
          'Keep heading copy short — the subhead carries detail.',
        ]}
        dontItems={[
          'Do not style Body as a heading.',
          'Do not use display inside a card or modal.',
          'Do not change font-size; change level.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Screen readers build a map from heading tags, not from how large the type looks."
      items={[
        'Heading emits a real h1, h2, or h3. Display is an h1.',
        'If the design needs H3 size but H2 rank, pass as="h2" and level={3}.',
        'Pages include exactly one h1 (or one display).',
        'Color tone is optional emphasis. The words remain the title without it.',
      ]}
    />
  ),
}

export const subheadGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Subhead sits directly under a heading. One supporting sentence, then a primary action if the screen needs
          one. It is not a second heading.
        </Body>
      </DocsProse>
      <DocsDoDont
        doItems={[
          'Keep it to one or two lines.',
          'Default tone is secondary so the heading stays first.',
          'Use it on empty states, auth, and marketing heroes.',
        ]}
        dontItems={[
          'Do not use Subhead as the only title on the page.',
          'Do not stack three subheads under one heading.',
          'Do not set it to a heading tag.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      items={[
        'Subhead renders a paragraph, not a heading. The Heading above it owns the outline.',
        'Do not replace a missing h2 with a bold subhead.',
        'Secondary tone is still readable against the page background in both themes.',
      ]}
    />
  ),
}

export const bodyGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Body is the reading size. Use size md for paragraphs and sm for denser copy inside cards. Measure lines near
          692px. Short sentences, one idea each.
        </Body>
      </DocsProse>
      <DocsDoDont
        doItems={[
          'Use Body for any paragraph the user is meant to read.',
          'Use size="sm" inside cards, dialogs, and form hints that are still essential.',
          'Prefer secondary tone for supporting copy, primary when the paragraph is the content.',
        ]}
        dontItems={[
          'Do not use Caption for a paragraph because it looks quieter.',
          'Do not set custom line-height or tracking.',
          'Do not put a call to action inside a body paragraph — use a Button.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      items={[
        'Body is a paragraph. Do not use it as a fake heading.',
        '17px / 19px meets reading size. Do not shrink it to fit more copy.',
        'Link tone is for inline TextLink, not for whole paragraphs.',
        'Disabled tone is for inert UI copy, not for de-emphasizing a message.',
      ]}
    />
  ),
}

export const captionGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Caption is 12px meta: timestamps, counts, and hints. If the user cannot complete the task without it, it is
          not a caption — use Body or a FieldHint.
        </Body>
      </DocsProse>
      <DocsDoDont
        doItems={[
          'Pair a caption with the object it describes, close in the layout.',
          'Use danger tone only when the caption restates an error already announced.',
          'Keep it to a single line when you can.',
        ]}
        dontItems={[
          'Do not put legal copy or instructions exclusively in a caption.',
          'Do not use caption as a button label.',
          'Do not reduce opacity further — tertiary is already the quiet tone.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      items={[
        '12px is supporting. Do not rely on it as the only error text for a field — FieldHint or Alert owns that.',
        'If a caption names a live region (last saved, member count), keep the wording specific.',
        'Do not use caption color alone to mark an error.',
      ]}
    />
  ),
}

export const eyebrowGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Eyebrow is a short uppercase label above a heading. Product, section, or kicker — not a sentence. It never
          replaces the heading.
        </Body>
      </DocsProse>
      <DocsDoDont
        doItems={[
          'Keep it to a few words: Product, New, Components / Typography.',
          'Place it immediately above the heading it introduces.',
          'Use the default tertiary tone unless it is a status kicker.',
        ]}
        dontItems={[
          'Do not write a full sentence in an eyebrow.',
          'Do not use it as the page h1.',
          'Do not track or uppercase by hand — the variant already does.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      items={[
        'Eyebrow is a paragraph, not a heading. Screen readers will not treat it as a section.',
        'Uppercase is visual. Write the words in normal case in the DOM if you need a friendlier announcement — or keep the kicker short.',
        'Do not rely on letter-spacing to make a long string readable.',
      ]}
    />
  ),
}

export const labelGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Label is 17px medium for controls and fields. Prefer FieldLabel in forms so the hint, error, and input stay
          associated. Use Label on its own for chrome: tabs, settings titles, empty-state actions.
        </Body>
      </DocsProse>
      <DocsDoDont
        doItems={[
          'Use htmlFor when Label wraps or sits beside a native control.',
          'Match the control size: 17px label, 44px field.',
          'Use disabled tone only when the field itself is disabled.',
        ]}
        dontItems={[
          'Do not use Label for a paragraph of help text — that is Body or Caption.',
          'Do not hide the label and rely on placeholder alone.',
          'Do not nest a Label inside a button that already has a name.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      items={[
        'Visible labels beat aria-label when the control is on screen.',
        'Pass htmlFor or wrap the control so assistive tech can find it.',
        'Disabled tone must match a disabled control, not a hint you want to quiet.',
      ]}
    />
  ),
}

export const iconButtonGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Icon Button is a 44px (or 32px small) control with no visible text. The label prop is required — it is the
          accessible name. Use onAction when the press should show a spinner, then a check or X.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Always name it', body: 'label is not optional. “Search”, “Copy”, “Delete” — a verb the user understands.' },
          { title: 'Ghost in chrome', body: 'Ghost and subtle sit in toolbars. Primary is a rare standalone action.' },
          { title: 'Feedback', body: 'onAction replaces the glyph while work runs. Do not also toast the same success unless the result is off-screen.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use Icon Button for a single, obvious glyph action.',
          'Use Button when the action needs a word.',
          'Use danger only for destructive actions, and confirm when the result is hard to undo.',
        ]}
        dontItems={[
          'Do not omit label.',
          'Do not put two glyphs in one Icon Button.',
          'Do not use a small size for a primary destructive action.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="There is no visible text, so the accessible name has to do all the work."
      items={[
        'label becomes aria-label. It must describe the action, not the icon (“Search”, not “Magnifying glass”).',
        'Native button. Tab to focus, Space or Enter to press.',
        'Loading, success, and error disable the control and expose a busy or status overlay.',
        'Badge counts are extra. The name still makes sense if the badge is empty.',
        'Disabled is not focusable. Prefer explaining why in nearby copy over a silent disabled icon.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move focus to the control' },
        { keys: ['Space'], action: 'Activate' },
        { keys: ['Enter'], action: 'Activate' },
      ]}
    />
  ),
}

export const switchGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Switch is an immediate on/off. The change applies now — do not put a Save button after it. Use SwitchItem
          inside SwitchGroup when several settings share a list. Danger is only for a setting that turns on a
          destructive mode.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Immediate', body: 'Flipping the switch is the commit. If the user needs to review, use a checkbox in a form.' },
          { title: 'Named', body: 'Standalone Switch needs label. SwitchItem uses title (and optional description).' },
          { title: 'Loading', body: 'While a network write runs, loading holds the thumb and blocks a second flip.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Put the title on the left, the switch on the right, in a settings row.',
          'Use outline or subtle when the row already has enough contrast.',
          'Use danger only when on means something destructive.',
        ]}
        dontItems={[
          'Do not use a switch for “agree to terms” — that is a checkbox.',
          'Do not require a second confirm for a routine preference.',
          'Do not leave label empty on a standalone switch.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A switch is not a checkbox. It announces on and off, and it applies immediately."
      items={[
        'role="switch" with aria-checked. Provide label or a visible SwitchItem title.',
        'Space and Enter toggle. Pointer down also toggles so the thumb can track the press.',
        'Disabled and loading are not operable. Loading keeps the name and exposes a busy spinner in the thumb.',
        'Do not rely on track color alone — the thumb position is the state, and the name includes the setting.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the switch' },
        { keys: ['Space'], action: 'Toggle on or off' },
        { keys: ['Enter'], action: 'Toggle on or off' },
      ]}
    />
  ),
}

export const segmentedGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Segmented Control picks one option from a small set. Inset is a sliding thumb. Grouped is joined buttons.
          Pair it with Icon Button and Button in SegmentedToolbar when the view needs filters and an action together.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Two to five', body: 'If there are more options, use Tabs or Select.' },
          { title: 'Same height', body: 'Medium is 44px, matching Button and Text Field.' },
          { title: 'Actions are extra', body: 'onAction shows a spinner on the pressed segment. Arrow keys only move selection.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use icon-only when every option has a unique, understood glyph, and still pass a text label.',
          'Use grouped beside a primary Button in a toolbar.',
          'Disable a single option rather than hiding it, so the set stays stable.',
        ]}
        dontItems={[
          'Do not use it for binary on/off — that is Switch.',
          'Do not wrap to a second line of segments.',
          'Do not fire a network call on every arrow key. Use onAction for press.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="This is a radiogroup. One option is selected. Icon-only segments still have a text name."
      items={[
        'role="radiogroup" on the track, role="radio" on each segment, aria-checked on the selected value.',
        'Pass label for a visible caption, or aria-label when the control stands alone.',
        'Icon-only content uses each option’s label as aria-label.',
        'Disabled options and a loading segment are not in the keyboard cycle.',
        'Arrow keys move selection. Enter or Space runs onAction if you provided one.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the selected segment' },
        { keys: ['ArrowLeft', 'ArrowRight'], action: 'Move selection' },
        { keys: ['Home', 'End'], action: 'First or last enabled option' },
        { keys: ['Enter', 'Space'], action: 'Press the selected segment (runs onAction)' },
      ]}
    />
  ),
}

export const confirmActionGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Confirm Action is a two-tap commit on the same control. First press asks. Second press runs onConfirm. Use
          it for remove, sign out, and other reversible-enough row actions. Use Confirm Dialog when the consequence
          needs a title and a body.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Same control', body: 'The label becomes Confirm? The user does not hunt for a second button.' },
          { title: 'Tone is the risk', body: 'Danger for delete. Brand for a product-owned commit. Neutral for quiet lists.' },
          { title: 'It resets', body: 'If the second tap never comes, the control returns to the original label after resetMs.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use text or ghost in a list row, solid when the action is the focus of the screen.',
          'Name the first label as the verb: Remove, Sign out, Disconnect.',
          'Use loading on the second tap when the request is in flight.',
        ]}
        dontItems={[
          'Do not use it for the primary happy-path submit — that is Button.',
          'Do not skip the confirm step by defaulting to solid unless the screen is already a confirm.',
          'Do not place two Confirm Actions that look identical in one row.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="The control is still one button. Pressed state tells assistive tech the confirm step is armed."
      items={[
        'Native button. aria-pressed is true while waiting for the second tap.',
        'The visible label changes to confirmLabel. Keep that string a question or a clear second verb.',
        'aria-busy while loading. Disabled while loading so a third tap cannot double-submit.',
        'Escape is not handled here — the timer resets. In a dialog, use Confirm Dialog instead.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the control' },
        { keys: ['Enter', 'Space'], action: 'Arm, then confirm on the second press' },
      ]}
    />
  ),
}

export const brandLogoGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Brand Logo is the product mark, wordmark, or lockup. Use lockup in a header. Use mark or icon when space is
          tight. Keep size 20 in nav, larger only in empty or marketing heroes.
        </Body>
      </DocsProse>
      <DocsDoDont
        doItems={[
          'Link the logo to home and give the link an accessible name such as “DevKit home”.',
          'Use the lockup when the product name is not already in the nearby heading.',
          'Keep one logo treatment per header.',
        ]}
        dontItems={[
          'Do not recolor the mark with a second accent.',
          'Do not animate the logo on every page load.',
          'Do not pair the wordmark with a duplicate text title in the same row.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      items={[
        'If the logo is inside a link, the link has the name. Decorative marks inside that link can be aria-hidden.',
        'If the logo is not a link, provide text nearby or an aria-label on the image.',
        'Do not rely on color in the mark to convey the product name.',
      ]}
    />
  ),
}

export const themeToggleGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Theme Toggle is the labeled appearance control. Default and compact belong in a sidebar or settings. Switch
          is the track alone when the row already has a title. Theme Icon Toggle is the toolbar counterpart.
        </Body>
      </DocsProse>
      <DocsDoDont
        doItems={[
          'Put it where appearance is expected: settings, sidebar foot, or docs chrome.',
          'Use labels or icons when the control must read without a separate heading.',
          'Persist through the kit theme — do not fork a second localStorage key.',
        ]}
        dontItems={[
          'Do not place both Theme Toggle and Theme Icon Toggle in the same header.',
          'Do not invent a third “system” control unless the product actually follows OS appearance.',
          'Do not change theme on hover.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      items={[
        'The switch exposes on/off for dark. Visible Light and Dark labels (or icons) name both ends.',
        'Keyboard: Tab to the switch, Space or Enter to toggle.',
        'The html data-theme attribute updates for the whole document. Do not announce a live region on every toggle.',
        'Disabled prevents change and is not focusable.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the switch' },
        { keys: ['Space', 'Enter'], action: 'Toggle light and dark' },
      ]}
    />
  ),
}

export const themeIconToggleGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Theme Icon Toggle is compact appearance chrome. Ghost, subtle, and outline swap one icon. Pair, segmented,
          and split show both sun and moon. Use pair in a docs or marketing header.
        </Body>
      </DocsProse>
      <DocsDoDont
        doItems={[
          'Use pair or segmented when both states should stay visible.',
          'Use ghost in an already-busy icon toolbar.',
          'Match the 44px height of nearby Icon Buttons.',
        ]}
        dontItems={[
          'Do not use this next to a full Theme Toggle.',
          'Do not rely on the glyph alone in a settings page — use Theme Toggle there.',
          'Do not change the icons to arbitrary glyphs.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      items={[
        'Single-icon variants name the action (for example, switch to dark). Pair and segmented name each option.',
        'Keyboard matches Icon Button or Segmented Control, depending on variant.',
        'Pressed or selected state must be exposed — do not use color inversion as the only selected cue.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the control' },
        { keys: ['Space', 'Enter'], action: 'Toggle, or select the focused segment' },
        { keys: ['ArrowLeft', 'ArrowRight'], action: 'Move between sun and moon on pair, segmented, and split' },
      ]}
    />
  ),
}
