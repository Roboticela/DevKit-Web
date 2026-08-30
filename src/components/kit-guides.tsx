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

export const numberFieldGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Number Field is a typed value with stepper arrows, like a browser number input. The unit sits
          beside the digits — none, percent, currency, degree, or pixels. Stacked chevrons match the
          desktop field. Split minus and plus is the compact quantity control.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Same chrome as Text Field', body: 'Outline, subtle, ghost, underline, and pill. Invalid and valid use the same danger and success rings.' },
          { title: 'Fits the digits', body: 'The field grows with the value. Each chrome has a cap — past that, extra digits clip like a text field.' },
          { title: 'Step, then type', body: 'Arrows and keys move by step. Typing is free until blur, then the value snaps and clamps.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use stacked chevrons in a form. Use split minus and plus for a quantity in a row.',
          'Pass unit="percent" or unit="currency" instead of drawing the sign yourself.',
          'Leave width at fit. Pass width="fill" only when the field must span the row.',
          'Set min, max, and step so the arrows always land on a legal value.',
        ]}
        dontItems={[
          'Do not use native input type="number". The browser spinner cannot match the kit.',
          'Do not use a slider when the user must type an exact figure. That is this field.',
          'Do not hide the unit in the placeholder. The suffix stays visible after the value is filled.',
          'Do not stretch the field by default. Fit is the size. Fill is the exception.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="The field is a spinbutton. The value can be typed or stepped. The unit is visible text, not the only name."
      items={[
        'The input has role="spinbutton" with aria-valuemin, aria-valuemax, aria-valuenow, and aria-valuetext including the unit.',
        'Arrow Up and Arrow Down move by step. Page Up and Page Down jump by ten steps. Home and End go to min and max when set.',
        'Stepper buttons are not in the tab order. They keep focus on the input. Disabled arrows at min or max stay visible.',
        'Focus is a 2px brand ring on the field. Invalid uses a danger ring and aria-invalid.',
        'Pass aria-label or a visible Field Label. The unit is extra, not the accessible name.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field' },
        { keys: ['ArrowUp', 'ArrowDown'], action: 'Increase or decrease by one step' },
        { keys: ['PageUp', 'PageDown'], action: 'Jump by ten steps' },
        { keys: ['Home', 'End'], action: 'Jump to the minimum or maximum' },
      ]}
    />
  ),
}

export const sliderGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Slider picks a number along a track. Pair it with a Number Field when the exact figure
          matters — the field sits at the end, the start, or on both ends of a range. Fill is the
          default track. Subtle, outline, ghost, and pill match the rest of the form chrome.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One value or two', body: 'Single mode is a number. Range is a pair that cannot cross.' },
          { title: 'Type when it matters', body: 'Pass field to attach a Number Field. The field fits the digits and grows up to a cap. Chrome, stepper, align, and width are the same props as Number Field.' },
          { title: 'On dark', body: 'tone="onDark" is for a black surface, such as the avatar editor.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill in most forms. Subtle on a card. Ghost in a dense list. Pill when the track should feel like a switch.',
          'Pass field when the user must type or step an exact value. Use unit for percent, currency, and px. Pass fieldVariant, fieldStepper, fieldAlign, and fieldWidth to match Number Field.',
          'Keep step coarse enough to land on with a thumb. Use a smaller step only when the value is continuous, such as zoom.',
        ]}
        dontItems={[
          'Do not use a slider for a small set of named options. That is a segmented control or a radio group.',
          'Do not put a Number Field next to a slider by hand. Pass field so the value, step, and bounds stay in sync.',
          'Do not stack two single sliders when the values are a min and a max. Use Range Slider with field="both".',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Each thumb is a slider. Pair a Number Field when the value must be typed. Arrow keys move by step. Home and End jump to the ends of the track."
      items={[
        'Each thumb has role="slider" with aria-valuemin, aria-valuemax, aria-valuenow, and aria-valuetext.',
        'Range exposes two thumbs. Tab moves between them. They cannot cross.',
        'Focus is a 2px brand ring. Invalid uses a danger ring and aria-invalid.',
        'When field is set, the Number Field is the spinbutton. The thumbs stay pointer-only so the value is not announced twice.',
        'Disabled is not operable. Explain why in nearby copy instead of a silent lock.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus a thumb, or the Number Field when field is set' },
        { keys: ['ArrowLeft', 'ArrowRight'], action: 'Move a thumb by one step' },
        { keys: ['ArrowUp', 'ArrowDown'], action: 'Step the Number Field by one step' },
        { keys: ['Home', 'End'], action: 'Jump to the minimum or maximum' },
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

export const checkboxGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Checkbox is a choice the user reviews before submitting. Several can be on at once. Use mixed when a parent
          stands for a set that is only partly selected. Danger is only for a destructive acknowledgement.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Form first', body: 'The change waits for Submit. If it should apply now, use Switch.' },
          { title: 'Named', body: 'Pass label, or an aria-label when the words sit elsewhere in the row.' },
          { title: 'Mixed is a parent', body: 'Indeterminate is for select all, not a third stored value.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use outline in forms, subtle on a secondary surface, ghost in a dense list.',
          'Use mixed on a parent when some, but not all, children are selected.',
          'Mark invalid when the field is required and still off after submit.',
        ]}
        dontItems={[
          'Do not use a checkbox for an immediate preference. That is a switch.',
          'Do not store mixed as a value. Resolve it to on or off when the user presses.',
          'Do not use danger for a routine opt in.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A checkbox is a native control. Keep the label in the same label element, or name it with aria-label."
      items={[
        'Uses a native checkbox. Space toggles. Tab moves focus. Focus is a 2px brand ring.',
        'indeterminate sets aria-checked to mixed. The minus is extra. The name still describes the set.',
        'invalid sets aria-invalid. Repeat the error in Field Hint. Color is not the only signal.',
        'Disabled is not operable. Explain why in nearby copy instead of a silent lock.',
        'The hit target is at least 44px tall, including the label.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the checkbox' },
        { keys: ['Space'], action: 'Toggle on, off, or resolve mixed' },
      ]}
    />
  ),
}

export const radioGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Radio picks one option from a small set. The selected control is a ring with a disc inside, not a filled
          circle. Keep the set in a Radio Group so the name and the keyboard stay together.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One of a set', body: 'Two to five options. If there are more, use Select. If several can be on, use Checkbox.' },
          { title: 'Named group', body: 'Every radio in the set shares name. Wrap them in Radio Group and pass a group label.' },
          { title: 'Ring and disc', body: 'Selected is a brand ring and an inner disc. That is how it differs from Checkbox.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use outline in forms, subtle on a card, ghost in a dense list.',
          'Put the most common option first, and select it by default when a choice is required.',
          'Use danger only when the choice itself is destructive.',
        ]}
        dontItems={[
          'Do not use a radio for on or off. That is a switch or a checkbox.',
          'Do not allow an empty selection in a required set. Keep one option selected.',
          'Do not mix radios that do not share a name in one group.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A radio is a native control in a radiogroup. Arrow keys move within the set. Space selects."
      items={[
        'Wrap the set in Radio Group so it exposes role="radiogroup" and a group name.',
        'Every option shares the same name. The checked option is the value.',
        'Tab lands on the selected option. Arrow keys move to the next. Space selects the focused option.',
        'Focus is a 2px brand ring. Invalid uses a danger ring and aria-invalid.',
        'The hit target is at least 44px tall, including the label.',
        'Disabled options stay visible. Do not remove the only selected option without selecting another.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the selected radio in the group' },
        { keys: ['ArrowUp', 'ArrowDown'], action: 'Move to the previous or next option' },
        { keys: ['Space'], action: 'Select the focused option' },
      ]}
    />
  ),
}

export const fieldLabelGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Field Label names a control. Pair it with Field Hint under the field, and Form Field to keep the three
          together. Optional is a suffix. Required is an asterisk. The hint carries success, warning, and error — not
          the label, unless the whole field is in that state.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Always visible', body: 'A placeholder is not a label. Keep the words on screen, even on a search field — or hide them with visuallyHidden so the name still exists.' },
          { title: 'Hint under the field', body: 'Help, success, and errors sit in Field Hint. Color is extra. The words are the signal.' },
          { title: 'Match the field', body: 'Small, medium, and large follow Text Field. Disabled, invalid, and valid on Form Field should match the control.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Pass htmlFor so the label focuses the control.',
          'Use Optional for a field the user can skip. Use required after submit when the field is empty.',
          'Put two related fields in Field Row. Use inline when the label should sit beside a compact control.',
        ]}
        dontItems={[
          'Do not rely on placeholder alone.',
          'Do not put the error only in the label color. Repeat it in Field Hint.',
          'Do not mix Optional and a required asterisk on the same label.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A field is named by its label. The hint is supporting text, not a second name."
      items={[
        'Use a native label with htmlFor, or wrap the control. Prefer visible text over aria-label when the field is on screen.',
        'visuallyHidden keeps the name for assistive tech when the layout has no room for a caption.',
        'The required asterisk is aria-hidden. Mark the control required or aria-required so the requirement is announced.',
        'Repeat errors in Field Hint. invalid on the label is color only. Set aria-invalid on the control.',
        'Disabled tone is only for a disabled control. Do not mute a label the user can still edit.',
      ]}
    />
  ),
}

export const otpGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          OTP Boxes is a one-time code. One digit per box. Paste fills the row. Outline is the default in auth.
          Underline is the quieter layout. Mark invalid and shake only after a failed check.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One digit', body: 'Each box holds a single number. Paste a full code and it splits across the row.' },
          { title: 'Advance on type', body: 'A digit moves focus to the next box. Backspace clears, then steps back.' },
          { title: 'Error after check', body: 'Invalid and shake run when the server rejects the code, not while the user is still typing.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use six boxes for authenticator apps. Use four only when the product always sends four.',
          'Use outline on a sign-in page. Use underline when the layout is already quiet.',
          'Call onComplete when every box is filled, then check the code.',
        ]}
        dontItems={[
          'Do not shake on every keystroke.',
          'Do not mix letters into a numeric code.',
          'Do not leave the row disabled without a reason next to it.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="The row is a group named Verification code. Each box is Digit 1 through Digit n."
      items={[
        'The first box uses autocomplete one-time-code so the OS can offer a suggestion.',
        'inputMode is numeric. Only digits are accepted.',
        'Arrow keys move between boxes. Backspace clears the current digit, then the previous.',
        'Paste a full code into any box. It fills from the start.',
        'invalid or error sets aria-invalid on the group and on every box. Repeat the error in nearby copy.',
        'Each box is at least 44px tall.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move into or out of the row' },
        { keys: ['0-9'], action: 'Enter a digit and advance' },
        { keys: ['Backspace'], action: 'Clear this digit, or the previous if empty' },
        { keys: ['ArrowLeft', 'ArrowRight'], action: 'Move between boxes' },
      ]}
    />
  ),
}

export const recoveryGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Recovery Input is a backup code or account recovery key. Letters and numbers, grouped in fours, always
          uppercase. Field is a single formatted line. Groups is the same code in boxes. Outline is the default
          in auth. Mark invalid and shake only after a failed check.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Grouped', body: 'Hyphens are inserted for you. Eight characters is a backup code. Twenty-eight is an Apple-style recovery key.' },
          { title: 'Field or groups', body: 'Field is one line. Groups is one box per four characters, with paste filling the row.' },
          { title: 'Error after check', body: 'Invalid and shake run when the server rejects the code, not while the user is still typing.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use length 8 for one-time backup codes. Use 28 for a full recovery key.',
          'Use outline on a sign-in page. Use underline when the layout is already quiet.',
          'Show Recovery Codes List when the user must save codes. Offer copy on that list.',
        ]}
        dontItems={[
          'Do not ask the user to type the hyphens.',
          'Do not shake on every keystroke.',
          'Do not show recovery codes without a way to copy or download them.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Field mode is a single labeled text input. Groups is a group of boxes named Recovery code."
      items={[
        'Only letters and numbers are accepted. They are uppercased as the user types.',
        'Paste a full code into the field or into any group. It formats and fills from the start.',
        'In groups, arrow keys move between boxes. Backspace clears, then steps back.',
        'invalid or error sets aria-invalid. Repeat the error in a Field Hint.',
        'Each field or box is at least 44px tall.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move into or out of the field' },
        { keys: ['A-Z', '0-9'], action: 'Enter a character. Groups advance when a box is full' },
        { keys: ['Backspace'], action: 'Delete the previous character, skipping hyphens' },
        { keys: ['ArrowLeft', 'ArrowRight'], action: 'Move the caret, or between groups' },
      ]}
    />
  ),
}

export const datePickerGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Date Picker is a Select whose menu is a calendar. Outline is the default in forms. Subtle sits on a card.
          Ghost is for a dense toolbar. Underline is the quietest. Pill matches a rounded field. Range mode picks a
          start and an end, then Done commits.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Same field', body: 'Chrome, size, invalid, and valid match Select and Text Field. Do not invent a second date field.' },
          { title: 'ISO in, words out', body: 'value is YYYY-MM-DD. The trigger shows a short readable date.' },
          { title: 'One calendar', body: 'Month and year open inside the same menu. Do not nest a second Select over the grid.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use single mode for a birthday, due date, or one-day filter.',
          'Use range mode for a report window. Done writes both dates.',
          'Mark invalid after submit and repeat the error in a Field Hint.',
        ]}
        dontItems={[
          'Do not use a native date input next to this field.',
          'Do not leave the trigger unlabeled. Pass label or aria-label.',
          'Do not lock dates with disabled unless nearby copy says why.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="The trigger is a button that opens a dialog. The calendar is a grid. Escape and a press outside close it."
      items={[
        'The trigger has aria-haspopup="dialog" and aria-expanded.',
        'Each day is a gridcell named with the full weekday, month, day, and year.',
        'Selected days set aria-selected. Disabled days are not operable.',
        'Month and year labels switch the view. Previous and next move by month, year, or decade.',
        'invalid sets aria-invalid on the trigger. Repeat the error in nearby copy.',
        'The trigger is at least 44px tall at the default size.',
      ]}
      keys={[
        { keys: ['Enter', 'Space'], action: 'Open or close the calendar' },
        { keys: ['Escape'], action: 'Close the calendar' },
        { keys: ['Tab'], action: 'Move through days, month, year, and actions' },
      ]}
    />
  ),
}

export const textFieldGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Text Field is a single line. Outline is the default in forms. Subtle sits on a card. Ghost is quiet in a
          dense list. Underline is the quieter layout. Pill is for search. Pair it with Field Label so the name stays
          on screen.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One line', body: 'If the user needs more than a sentence, use Textarea. If the value is a secret, use Password Field.' },
          { title: 'Named, then hinted', body: 'Field Label names the control. Field Hint carries help, success, and errors under the field.' },
          { title: 'Same chrome', body: 'Invalid and valid use the same danger and success rings as Select, Password Field, and OTP Boxes.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Pass a leading icon on auth and settings fields so the type of value is obvious at a glance.',
          'Use outline on a sign-in page. Use pill for search. Use underline when the layout is already quiet.',
          'Mark invalid after submit, and repeat the error in Field Hint.',
        ]}
        dontItems={[
          'Do not use the placeholder as the only label.',
          'Do not rely on a red border alone. Set aria-invalid and put the words next to the field.',
          'Do not mix a custom height. Small, medium, and large already match Button and Select.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A text field is a native input. Name it with a visible Field Label and htmlFor, or with aria-label when the words sit elsewhere."
      items={[
        'Focus is a 2px brand ring. Invalid uses a danger ring and aria-invalid. Valid uses a success ring.',
        'Medium is 44px tall. Small stays at least 36px. The label is extra height above the field.',
        'Pass autocomplete that matches the value, such as email or username, so the browser and password manager can help.',
        'Disabled is not operable. Explain why in nearby copy instead of a silent lock.',
        'A leading icon is decorative. The accessible name is the label, not the glyph.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field' },
        { keys: ['Enter'], action: 'Submit the surrounding form' },
      ]}
    />
  ),
}

export const textareaGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Textarea is more than one line. Outline, subtle, ghost, and underline match Text Field. Well is a Notes-style
          pad. Composer adds a footer for a hint and a character count. Pair it with Field Label.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'More than a line', body: 'Use Text Field for a name, email, or search. Use Textarea for a note, bio, or message.' },
          { title: 'Count when it matters', body: 'Set maxLength when there is a real cap. Composer shows the count in the footer.' },
          { title: 'Well is a pad', body: 'Well and composer do not resize. The rest can stretch vertically unless you pass resize="none".' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use outline in a form. Use well for an internal note. Use composer when the count or a short hint belongs in the field.',
          'Put the error in Field Hint, not only in the border.',
          'Keep the minimum height large enough to write two or three lines without stretching first.',
        ]}
        dontItems={[
          'Do not use a textarea for a single-line value.',
          'Do not show a count unless the limit is real.',
          'Do not put a primary action inside the field. Composer is for a hint and a count, not a Send button.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A textarea is a native multi-line input. Name it with Field Label. The count is supporting text, not the name."
      items={[
        'Focus is a 2px brand ring. Invalid uses a danger ring and aria-invalid.',
        'The character count is visible text. It does not replace a label.',
        'Resize, when allowed, is vertical only so the layout does not break sideways.',
        'Disabled is not operable. Read-only still allows copy.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field' },
        { keys: ['Enter'], action: 'Insert a new line' },
      ]}
    />
  ),
}

export const passwordFieldGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Password Field is Text Field with a lock and a reveal. The value is masked until the user shows it. Outline
          matches the rest of auth. The reveal can be an icon, Show/Hide text, or a pill.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Masked by default', body: 'The field starts hidden. Reveal is a choice, not the default.' },
          { title: 'Same chrome as Text Field', body: 'Outline, subtle, ghost, underline, and pill. Invalid and valid use the same rings.' },
          { title: 'Reveal is an accessory', body: 'It lives inside the field. It is not a second Button beside it.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use autocomplete current-password on sign-in and new-password on create account.',
          'Keep the lock unless the surrounding layout already makes the field obvious.',
          'Mark invalid after a failed sign-in, and repeat the error under the field.',
        ]}
        dontItems={[
          'Do not show the password by default.',
          'Do not use Text Field with type="password" and a custom toggle. That is this component.',
          'Do not put the reveal outside the field as a separate ghost button.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="The field is a native password input. The reveal is a separate button named Show password or Hide password."
      items={[
        'The reveal has aria-pressed for the shown state and an aria-label that flips with visibility.',
        'Mouse down on the reveal is prevented so the field keeps focus while the value is shown.',
        'Focus on the field is a 2px brand ring. Invalid uses a danger ring and aria-invalid.',
        'Pass autocomplete current-password or new-password so the password manager can fill the field.',
        'spellCheck and autocapitalize are off. The value is not a sentence.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field, then the reveal' },
        { keys: ['Enter', 'Space'], action: 'On the reveal, show or hide the password' },
      ]}
    />
  ),
}

export const passwordRevealGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Password Reveal shows or hides a password. Ghost is the default inside a field. Text is Apple-style
          Show/Hide. Pill is a labeled chip. Use it on Password Field, or stand it alone with inField set to false.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Inside the field', body: 'inField is the default. The control sits on the trailing edge of Text Field.' },
          { title: 'Name the action', body: 'Icon-only still says Show password. Text and pill show Show or Hide.' },
          { title: 'Match the size', body: 'Small, medium, and large follow the field they sit in.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Prefer Password Field, which already includes a reveal.',
          'Use text or pill when the control must be understood without an icon.',
          'Keep the same size as the field.',
        ]}
        dontItems={[
          'Do not use it to reveal anything except a password or similar secret.',
          'Do not place two reveals on one field.',
          'Do not leave it unlabeled. Icon-only still needs aria-label.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="The reveal is a button. It does not submit the form. The name is Show password or Hide password."
      items={[
        'type="button" so Enter in the field still submits the form, not the reveal.',
        'aria-pressed is true while the password is shown.',
        'onMouseDown is prevented so focusing the reveal does not blur the field.',
        'Disabled follows the field. A disabled field does not reveal.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the reveal' },
        { keys: ['Enter', 'Space'], action: 'Show or hide' },
      ]}
    />
  ),
}

export const selectGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Select picks one value from a list. Outline, subtle, ghost, underline, and pill match Text Field. Options can
          carry an icon, a description, and a short meta line. Search filters a long list. The popup is the same width
          as the field.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One value', body: 'If several can be on, use Checkbox. If the set is two to five and always visible, use Radio or Segmented Control.' },
          { title: 'Search when the list is long', body: 'Countries, languages, and plans with many options pass searchable.' },
          { title: 'Width matches the field', body: 'The menu is not a floating card of a different size. matchWidth is the default.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Pass a Field Label or aria-label. Placeholder is not the name.',
          'Use option icons when every row has a unique glyph, such as a flag or a plan mark.',
          'Mark invalid after submit, the same way as Text Field.',
        ]}
        dontItems={[
          'Do not use it for a binary on or off. That is Switch.',
          'Do not leave a required select on the placeholder. Select a sensible default when you can.',
          'Do not build a custom menu for countries, states, or languages. Those already wrap this Select.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="The field is a button that opens a listbox. The selected option is the accessible value."
      items={[
        'The trigger has aria-haspopup="listbox", aria-expanded, and aria-controls pointing at the menu.',
        'Each row is role="option" with aria-selected on the current value. Disabled options are skipped.',
        'Pass label or aria-label. The visible value is not enough when the field is empty.',
        'Search, when present, is a search input at the top of the menu. Type to filter, then choose an option.',
        'Focus on the field is a 2px brand ring. Invalid uses a danger ring and aria-invalid.',
        'The hit target is at least 44px tall at medium size.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field, or move into search and options when open' },
        { keys: ['Enter', 'Space'], action: 'Open the menu, or choose the focused option' },
        { keys: ['Escape'], action: 'Close the menu' },
      ]}
    />
  ),
}

export const countrySelectGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Country Select is a searchable Select of countries, with flags on the field and in the menu. Pass the ISO
          code to State Select, City Select, and Phone Input so the rest of the address follows the country.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'ISO in, name out', body: 'value is a two-letter code such as US or PK. The menu shows the country name and the flag.' },
          { title: 'Search the list', body: 'Type a name, code, or dialing code. The list is long on purpose.' },
          { title: 'Clear the cascade', body: 'When the country changes, clear state, county, and city in the same handler.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use this instead of a plain Select of country names.',
          'Pass enabledIsos when only some countries can be chosen. The rest stay visible as Coming soon.',
          'Set allowClear false when a country is required.',
        ]}
        dontItems={[
          'Do not store the display name. Store the ISO code.',
          'Do not filter the menu by hiding rows without a disabled state. Keep unavailable countries in the list.',
          'Do not skip this field and type a country into Text Field.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="This is a Select. The accessible name defaults to Country. Each option is a country name with a flag that is decorative."
      items={[
        'The trigger uses aria-haspopup="listbox". Search is a search field at the top of the menu.',
        'Flags are images with the country name already in the option text. They do not need a second name.',
        'Clear, when allowed, is an option labeled Not set that stores null.',
        'Keyboard matches Select. Type in search to filter, then choose a row.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field, or move into search and options when open' },
        { keys: ['Enter', 'Space'], action: 'Open the menu, or choose the focused option' },
        { keys: ['Escape'], action: 'Close the menu' },
      ]}
    />
  ),
}

export const stateSelectGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          State Select is a searchable Select of regions. Pass a country to filter. The label follows the country:
          State in the US, Province in Pakistan and Canada, Emirate in the UAE.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Country first', body: 'Pass country so the list is that country’s regions. Without it, the catalog is mixed.' },
          { title: 'Code in, name out', body: 'value is ISO 3166-2, such as US-CA or PK-SD.' },
          { title: 'Clear the next field', body: 'When the region changes, clear county and city in the same handler.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Put Country Select above this field, and pass its value as country.',
          'Use the default label so it reads State, Province, or Emirate for that country.',
          'Pass items when your directory is larger than the starter catalog.',
        ]}
        dontItems={[
          'Do not ask for a state in a country that has none. Hide the field instead.',
          'Do not keep a previous region after the country changes.',
          'Do not type a region into Text Field.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="This is a Select. The accessible name is the regional noun for that country, such as State or Province."
      items={[
        'Keyboard, search, and aria-haspopup match Select.',
        'Empty search copy names the noun, such as No provinces for this country.',
        'Disabled when the country has not been chosen yet is clearer than an empty list. Explain it in Field Hint if you lock the field.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field, or move into search and options when open' },
        { keys: ['Enter', 'Space'], action: 'Open the menu, or choose the focused option' },
        { keys: ['Escape'], action: 'Close the menu' },
      ]}
    />
  ),
}

export const countySelectGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          County Select is a searchable Select of counties or districts. Pass a state to filter. Skip the field in
          countries that do not use this layer.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'State first', body: 'Pass state so the list is that region’s counties.' },
          { title: 'Optional layer', body: 'Not every country has counties. Hide the field when the catalog is empty.' },
          { title: 'Clear city', body: 'When the county changes, clear city in the same handler.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Show this field only when the selected state has counties in your catalog.',
          'Pass items for a full directory. The kit ships a starter set.',
          'Keep the label County, or District, to match the country.',
        ]}
        dontItems={[
          'Do not show an empty county field on every address form.',
          'Do not keep a previous county after the state changes.',
          'Do not require a county where the country does not use one.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="This is a Select. The accessible name defaults to County."
      items={[
        'Keyboard, search, and aria-haspopup match Select.',
        'If you hide the field, do not leave a required county in the form data.',
        'Disabled until a state is chosen is fine. Say why in Field Hint.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field, or move into search and options when open' },
        { keys: ['Enter', 'Space'], action: 'Open the menu, or choose the focused option' },
        { keys: ['Escape'], action: 'Close the menu' },
      ]}
    />
  ),
}

export const citySelectGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          City Select is a searchable Select of cities. Pass a country, state, or county to narrow the list. County
          wins, then state, then country. The kit ships a starter catalog — pass items for a full directory.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Narrow from above', body: 'Pass county, state, or country. The tightest filter wins.' },
          { title: 'Starter catalog', body: 'The bundled list is for demos. Pass items when the product needs every city.' },
          { title: 'Clear on cascade', body: 'When country, state, or county changes, clear this value in that handler.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Place it last in an address stack, after country, state, and county.',
          'Allow typing in search. City lists are long.',
          'Pass items from your own directory for production.',
        ]}
        dontItems={[
          'Do not list every city in the world without a country or state filter.',
          'Do not keep a previous city after the region changes.',
          'Do not use Text Field for a city when a known list exists.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="This is a Select. The accessible name defaults to City."
      items={[
        'Keyboard, search, and aria-haspopup match Select.',
        'Search is required in practice. Do not remove it on a long list.',
        'Disabled until a country is chosen is fine. Say why in Field Hint.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field, or move into search and options when open' },
        { keys: ['Enter', 'Space'], action: 'Open the menu, or choose the focused option' },
        { keys: ['Escape'], action: 'Close the menu' },
      ]}
    />
  ),
}

export const languageSelectGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Language Select is a searchable Select of languages. The value is a BCP 47 id such as en-US. Use it for
          display language, not for a spoken-language survey with several answers — that is Checkbox.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One language', body: 'The field stores one id. If the user can pick several, use a group of checkboxes.' },
          { title: 'Search native names', body: 'Type English or the native name. Keywords include both.' },
          { title: 'Coming soon', body: 'Pass enabledIds when only some locales ship. The rest stay in the list as unavailable.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Store the BCP 47 id, not the display name.',
          'Put this on account or appearance settings, not in the middle of an address form.',
          'Keep unavailable languages visible so the list stays stable as you ship more.',
        ]}
        dontItems={[
          'Do not use a plain Select of translated labels without ids.',
          'Do not hide languages that are not ready. Mark them disabled.',
          'Do not use this for spoken languages when several can be true. That is Checkbox.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="This is a Select. The accessible name defaults to Language."
      items={[
        'Keyboard, search, and aria-haspopup match Select.',
        'The option text is the language name. The id is meta, not the accessible name.',
        'There is no clear row by default. A language stays selected.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field, or move into search and options when open' },
        { keys: ['Enter', 'Space'], action: 'Open the menu, or choose the focused option' },
        { keys: ['Escape'], action: 'Close the menu' },
      ]}
    />
  ),
}

export const phoneInputGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Phone Input is a country code plus a national number. The code is a Select with flags. The number formats
          as the user types. The value you store is E.164, such as +14155552671.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'E.164 out', body: 'onChange emits + and digits. The national field is display only.' },
          { title: 'Code is a Select', body: 'The popup matches the full field width, the same as other Selects on the page.' },
          { title: 'Format as they type', body: 'Hyphens and spaces are inserted for the selected country. Backspace skips them.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use this instead of a single Text Field for a phone number.',
          'Keep the country Select and the number on one row.',
          'Validate length after the user leaves the field, not on every keystroke.',
        ]}
        dontItems={[
          'Do not store the formatted national number. Store E.164.',
          'Do not add a second country field next to this one.',
          'Do not strip the plus. Downstream SMS and auth APIs expect E.164.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Two controls share the row: a Country code listbox and a Phone number text field."
      items={[
        'The Select is named Country code. The input is named with the label, default Phone number.',
        'The number uses inputMode tel and autocomplete tel-national.',
        'Backspace over a hyphen or space deletes the previous digit, not only the punctuation.',
        'Disabled dims both the Select and the number.',
        'Each control is at least 44px tall.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move from country code to the number, or out of the field' },
        { keys: ['Enter', 'Space'], action: 'On the country control, open the menu' },
        { keys: ['Escape'], action: 'Close the country menu' },
        { keys: ['Backspace'], action: 'Delete the previous digit, skipping formatting' },
      ]}
    />
  ),
}

export const alertGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Alert is an inline status message. Subtle is the default on a page. Outline sits on a card. Ghost is for a
          dense list. Solid is for a moment that must not be missed. Tone is the meaning: info, success, warning,
          danger, or a quiet neutral note.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One idea', body: 'A short title states the fact. The body is one supporting line, not a paragraph.' },
          { title: 'Tone is the meaning', body: 'Info is a status. Success confirms a save. Warning needs attention. Danger is a failure. Neutral has no semantic color.' },
          { title: 'Dismiss is optional', body: 'Use onDismiss when the user can safely hide the note. Keep blocking errors on the page until they are fixed.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use subtle in a form or dashboard. Use outline when the alert sits on a tinted card.',
          'Put a single action under the body, such as Try again or View invoice.',
          'Mark danger and warning so assistive tech hears them as alerts, not status.',
        ]}
        dontItems={[
          'Do not stack three alerts. Fix the first, then show the next.',
          'Do not use solid for a routine save. That is Success in subtle.',
          'Do not put a second accent color on the action. Use the same tone as the alert.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Info, success, and neutral use role status. Warning and danger use role alert so a screen reader announces them immediately."
      items={[
        'The title is the name of the message. The body is supporting copy, not a second heading.',
        'Dismiss is an icon button named Dismiss. It is at least 32px.',
        'The action, if present, is a Button. Keep its label a short verb.',
        'Do not rely on icon color alone. The title restates the meaning.',
        'Hide the icon only when the nearby heading already carries the same meaning.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move to the action or Dismiss' },
        { keys: ['Enter', 'Space'], action: 'Activate the action or dismiss the alert' },
      ]}
    />
  ),
}

export const emptyStateGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Empty State is the view when a list, search, or canvas has nothing to show. Fill is the default, the same
          quiet page Apple uses for Mail and Files. Subtle, outline, and pill sit inside a card. Ghost is type and a
          glyph with no chrome.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One reason', body: 'The title names what is missing. The body is one line that says what happens next.' },
          { title: 'One action', body: 'A single primary button is enough. A secondary action is a quieter way out, not a second CTA.' },
          { title: 'Deference', body: 'The glyph stays tertiary gray unless the empty is a failure. Then use danger.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill on a page. Use subtle or outline when the empty sits in a card or table slot.',
          'Use small in a table or sidebar. Use large only when the empty is the whole view.',
          'Name the action as a verb the person can do now, such as New project or Try again.',
        ]}
        dontItems={[
          'Do not illustrate every empty with a custom drawing. A kit icon is enough.',
          'Do not stack three sentences. If you need a longer story, that is a page, not an empty state.',
          'Do not use success green for All caught up. That is still a calm default empty.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Empty State is a region named by its title. It is not a live status. The action, if present, is a Button."
      items={[
        'The title is a heading. Assistive tech can move to it when the view has no rows.',
        'The body is supporting copy, not a second heading.',
        'If there is no icon, the title still names the view.',
        'Disabled on the action is the button, not the region.',
        'Do not rely on icon color. The title restates a failure, such as Could not load.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move to the action' },
        { keys: ['Enter', 'Space'], action: 'Activate the action' },
      ]}
    />
  ),
}

export const progressGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Progress shows how far a task has gone. Fill is the default, the same quiet bar Apple uses for downloads
          and storage. Subtle, outline, ghost, and pill match the rest of the kit. Mark success when the work is
          done, danger when it failed.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Known amount', body: 'Pass a value from 0 to 100 when you know how far along the work is.' },
          { title: 'Unknown amount', body: 'Pass indeterminate while you wait. The bar travels. Do not fake a percent.' },
          { title: 'Name it', body: 'A label is the accessible name. The percent is extra, not the only signal.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill for uploads, installs, and quotas. Use pill when the bar should feel like a control, such as storage on a card.',
          'Switch tone to success at 100 percent, or danger after a failed transfer.',
          'Keep one bar per task. A list of files gets one bar each, not one bar for the whole set unless that is the story.',
        ]}
        dontItems={[
          'Do not use Progress for a value the person sets. That is Slider or Number Field.',
          'Do not animate the percent on every byte if it makes the label jump. Round, then update.',
          'Do not leave an indeterminate bar after you know the value. Swap to a determinate bar.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Progress is a progressbar. It is not operable. The label is the name. The percent is the value."
      items={[
        'role="progressbar" with aria-valuemin 0, aria-valuemax 100, and aria-valuenow when the value is known.',
        'indeterminate omits aria-valuenow, sets aria-busy, and uses aria-valuetext Loading.',
        'If there is no visible label, the bar still has an accessible name.',
        'Disabled is visual only. The bar is never a tab stop.',
        'The traveling fill respects prefers-reduced-motion and stops.',
      ]}
    />
  ),
}

export const skeletonGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Skeleton is a placeholder while content loads. Subtle is the default, the same quiet fill as a disabled
          field. Outline is a wireframe. Ghost is fainter on any surface. Pill is for a button or badge. Match the
          shape of what will appear: a line of text, a heading, a circle for an avatar, a rect for an image.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Same shape', body: 'The placeholder should occupy the same space as the loaded content so the layout does not jump.' },
          { title: 'Quiet motion', body: 'Shimmer is the default. Pulse is an opacity breath. Static is for prefers-reduced-motion or a paused load.' },
          { title: 'Not a spinner', body: 'A skeleton stands in for structure. Use Loading Screen or a Progress bar when the wait has no layout yet.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use lines for a paragraph, circle plus lines for a list row, rect for an image.',
          'Pass a label on a group so assistive tech hears Loading.',
          'Keep one motion on a screen. Do not mix shimmer and pulse in the same view.',
        ]}
        dontItems={[
          'Do not use a skeleton after the content is ready. Swap it out.',
          'Do not brand the fill with success or danger. A placeholder has no status.',
          'Do not animate if the user asked for reduced motion. Motion none is the rest state.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Each bone is hidden from assistive tech. A labeled group is a status that stays busy until you replace it."
      items={[
        'Individual placeholders are aria-hidden. They are not names or values.',
        'Pass label to set role status, aria-busy, and the accessible name, such as Loading profile.',
        'The parent that will receive the content should be aria-busy while skeletons are showing.',
        'Shimmer and pulse stop when prefers-reduced-motion is set. Use motion none to match that by default.',
      ]}
    />
  ),
}
