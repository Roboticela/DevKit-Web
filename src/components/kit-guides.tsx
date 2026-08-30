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
        'Link tone is for an inline Anchor, not for whole paragraphs.',
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
          'Use text or ghost in a list row. Text is Anchor until the confirm tap. Solid when the action is the focus of the screen.',
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

export const dividerGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Divider is a hairline between sections. Solid is the default, the same quiet rule Apple uses in Settings and
          on sign-in. Subtle is quieter inside a card. Dashed and dotted mark a softer break. Fade dissolves at the
          edges. Pass children for a centered label such as “or continue with.”
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Separate, don’t decorate', body: 'A divider marks a change of topic or a choice between two paths. If spacing already does that work, omit it.' },
          { title: 'Hairline first', body: 'Solid and subtle are 1px. Large is 2px for a major section, not a second accent.' },
          { title: 'Name the choice', body: 'A label is for a fork, such as password or a provider. A plain rule is for a list or a page break.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use a labeled divider on sign-in between the form and social buttons.',
          'Use inset on a grouped list so the rule lines up with the row title.',
          'Use vertical in a toolbar between peer actions. Keep it flush so it sits on the type.',
        ]}
        dontItems={[
          'Do not stack dividers as a substitute for spacing. Use the spacing scale.',
          'Do not paint a divider in a second accent. Brand is only for a branded break, such as a selected section.',
          'Do not put essential instructions only in the label. The layout must still read without it.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="An unlabeled divider is decorative. A labeled divider is a separator with an accessible name."
      items={[
        'Unlabeled rules are aria-hidden so they do not appear in the accessibility tree.',
        'A label or icon sets role="separator" and aria-orientation. String children become aria-label.',
        'Pass decorative when a labeled rule should stay silent, such as a repeated visual in a gallery.',
        'Disabled is visual only. The divider is never a tab stop.',
        'Do not rely on tone color alone. The words in the label carry the meaning.',
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

export const listRowGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          List Row is one cell in a grouped list. Put rows in a{' '}
          <DocsInlineCode>ListGroup</DocsInlineCode>. Fill is the default inset group, the same white
          card Settings uses on a gray page. Subtle tints the group. Outline holds an edge on a busy
          surface. Ghost is a plain list with hairline rules. Pill is a nested well with capsule
          rows.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Group first', body: 'A row never sits alone on the page. The group is the surface. The row is the cell.' },
          { title: 'One job', body: 'A row either drills in, toggles, or shows a value. Do not mix a switch and a chevron.' },
          { title: 'Inset rules', body: 'The hairline starts at the title, not under the leading mark. Last row has no rule.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill on a page. Use ghost inside an existing card. Use pill in a compact sheet.',
          'Pass chevron or href when the row opens another view. Pass a Switch as trailing when the row is a setting.',
          'Use danger tone for Delete and Sign out. Use brand tone for Add account and other constructive actions.',
        ]}
        dontItems={[
          'Do not nest a Button in a tappable row. Trailing actions belong on a static row.',
          'Do not paint a second accent on the selected row. Brand is the only tint.',
          'Do not use List Row for a labeled control with a long description. That is Settings Row.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A List Group is a list. Each row is a list item. A tappable row is a button or a link. A static row is not in the tab order."
      items={[
        'href renders a link. onClick renders a button. A row with only trailing controls stays a static item.',
        'selected sets aria-current. The checkmark is decorative. The title still names the row.',
        'disabled dims the row and removes it from the click cycle. The title remains readable.',
        'Do not rely on tone color. Danger rows still say Delete or Sign out in the title.',
        'A Switch or Text Action in trailing is its own control. Do not also make that row a button.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move to a tappable row, or to a trailing control' },
        { keys: ['Enter', 'Space'], action: 'Activate the focused row or control' },
      ]}
    />
  ),
}

export const settingsRowGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Settings Row is one cell in a preference list. Put rows in a{' '}
          <DocsInlineCode>SettingsList</DocsInlineCode>. Fill is the default inset group, the same
          white card Settings uses on a gray page. Subtle tints the group. Outline holds an edge on
          a busy surface. Ghost is a plain list with hairline rules. Pill is a nested well with
          capsule rows.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Group first', body: 'The list is the surface. The row is the cell. Header names the section. Footer explains it.' },
          { title: 'One job', body: 'A row either flips a switch, drills in, shows a value, picks from a set, or runs an action. Do not mix a switch and a chevron.' },
          { title: 'The mark is the category', body: 'A colored well names the setting at a glance. Brand is the default. Teal is verified. Danger is destructive. Muted is system.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill on a settings page. Use ghost inside an existing card. Use pill in a compact sheet.',
          'Pass a Switch as control. Pass value plus onClick for Language and similar. Pass selected for a choice set.',
          'Use danger tone for Delete and Sign out. Use brand tone for Add account. Keep the title a short verb.',
        ]}
        dontItems={[
          'Do not nest a Button in a tappable row. The switch or the row is the control, not both as buttons.',
          'Do not put two settings in one row. Split them.',
          'Do not use Settings Row for a person in a list. That is List Row.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A Settings List is a group. A tappable row is a button or a link. A row with a switch stays static so the switch keeps the keyboard."
      items={[
        'href renders a link. onClick without a nested control renders a button. A switch row stays a static item.',
        'Selection rows set aria-pressed. The checkmark is decorative. The title still names the choice.',
        'disabled and loading dim the row. Loading replaces the trailing control with a spinner and sets aria-busy.',
        'Do not rely on tone or icon color. Danger rows still say Delete or Sign out in the title.',
        'The icon well is hidden from assistive tech. The label is the name.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move to a tappable row, or to a switch' },
        { keys: ['Enter', 'Space'], action: 'Activate the focused row or flip the switch' },
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
          'Use fill on a page. Use subtle or outline when the empty sits in a card or table slot. Use Empty Popup inside a menu or palette.',
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

export const loaderGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Loader is the activity indicator. Fill is the default, the same quiet spinning ring Apple uses on a
          page. Subtle, outline, and pill sit in a circular well. Ghost is a fainter ring. Use this for an inline
          wait. Use Loading Screen when the whole view is not ready.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Unknown amount', body: 'The ring travels because you do not know how far along the work is. If you do, use Progress.' },
          { title: 'One accent', body: 'Brand is the default tick. Default is the gray Apple ring. Success, warning, and danger are for a wait that already has meaning.' },
          { title: 'Name it', body: 'A short label is the accessible name. If there is no label, the name is Loading.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill next to a line of copy or in a toolbar. Use pill or subtle when the wait sits on a card.',
          'Use small in a button row or a table. Use large only when the loader is the focus of the view.',
          'Keep the label one calm word or a short phrase, such as Saving or Loading messages.',
        ]}
        dontItems={[
          'Do not use Loader for a branded boot. That is Loading Screen.',
          'Do not stack three loaders. One wait per view.',
          'Do not leave a loader after the work is done. Replace it with the content, or with Empty State if nothing arrived.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Loader is a status. It is busy until you replace it. It is not operable."
      items={[
        'role="status" with aria-busy and aria-live polite. The label is the accessible name.',
        'If there is no label, the name is Loading.',
        'decorative hides the loader from assistive tech. Use that only when a parent already names the wait, such as Loading Screen.',
        'The ring is hidden from assistive tech. The text carries the meaning.',
        'prefers-reduced-motion stops the spin. The ring stays as a static arc.',
      ]}
    />
  ),
}

export const loadingScreenGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Loading Screen holds the view while work finishes. Fill is the default, the same branded wait Apple uses
          at boot and sign in. Subtle, outline, and pill sit inside a panel. Ghost is the mark and spinner with no
          chrome.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Unknown amount', body: 'This is a wait, not a percent. If you know how far along the work is, use Progress.' },
          { title: 'One line', body: 'The status is one calm sentence. After a real wait, swap to the delayed line.' },
          { title: 'Brand, then motion', body: 'The mark identifies the product. The spinner or bar is extra proof that work is still going.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill for a full page boot. Use subtle or outline when the wait is a card or a pane.',
          'Pass delayedStatus and a delay of several seconds. Do not show the delayed line on the first frame.',
          'Use the bar when the wait sits with other progress in the same view. Use the spinner for a branded boot.',
        ]}
        dontItems={[
          'Do not fake a percent. If the amount is unknown, keep the bar traveling or use the spinner.',
          'Do not put a retry button on this screen. When the wait fails, that is Empty State or Alert.',
          'Do not use Loading Screen for a list that is arriving. That is Skeleton.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Loading Screen is a status. It is busy until you replace it. It is not operable."
      items={[
        'role="status" with aria-busy and aria-live polite. The status line is the accessible name.',
        'When the delayed line replaces the first, the live region announces the new copy.',
        'The mark is decorative. The status, or Loading if there is no status, is the name.',
        'The spinner and bar are hidden from assistive tech. The text carries the meaning.',
        'prefers-reduced-motion stops the spin and the traveling bar.',
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

export const scoreRingGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Score Ring shows a score or how far a circular task has gone. Fill is the default, the same quiet ring
          Apple uses for downloads and Screen Time. Subtle tints the track. Outline, ghost, and pill match the rest
          of the kit. Mark success when the work is done, danger when it failed.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Known amount', body: 'Pass a score from 0 to 100 when you know the value. The arc fills from the top, clockwise.' },
          { title: 'Unknown amount', body: 'Pass indeterminate while you wait. The arc travels. Do not fake a percent.' },
          { title: 'Name it', body: 'A label is the accessible name. The percent in the center is extra, not the only signal.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill for a profile score, a quota, or a setup checklist. Use pill when the ring should feel like a control on a card.',
          'Switch tone to success at 100 percent, or danger after a failed check. Pass showCheck when a mark should replace the number.',
          'Keep one ring per metric. A set of scores is a row of rings, not concentric rings unless that is the story.',
        ]}
        dontItems={[
          'Do not use Score Ring for a value the person sets. That is Slider or Number Field.',
          'Do not use it as a page spinner. That is Loading Screen.',
          'Do not leave an indeterminate ring after you know the value. Swap to a determinate ring.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Score Ring is a progressbar. It is not operable. The label is the name. The percent is the value."
      items={[
        'role="progressbar" with aria-valuemin 0, aria-valuemax 100, and aria-valuenow when the value is known.',
        'indeterminate omits aria-valuenow, sets aria-busy, and uses aria-valuetext Loading.',
        'If there is no visible label, the ring still has an accessible name.',
        'Disabled is visual only. The ring is never a tab stop.',
        'The traveling arc respects prefers-reduced-motion and stops.',
      ]}
    />
  ),
}

export const skeletonGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Wrap the real component in Skeleton. The child tree still mounts, so the bones keep its size, radius, and
          gaps. The stylesheet is compiled with the app. If that sheet is not in the document yet, the same CSS is
          inserted once at runtime. There is no layout measurement on load. Bones without children remain for a
          line, heading, circle, rect, or square.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Wrap the real tree', body: 'Pass the component that will appear. Placeholder props are enough. The layout is the skeleton.' },
          { title: 'Compiled CSS', body: 'Rules are built with the stylesheet. Runtime only toggles an attribute, or inserts the same sheet once if it was missing.' },
          { title: 'Quiet motion', body: 'Shimmer is the default. Pulse is an opacity breath. Static is for prefers-reduced-motion or a paused load.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Wrap the loaded view. Set loading false when the data is ready.',
          'Pass a label so assistive tech hears Loading.',
          'Keep one motion on a screen. Do not mix shimmer and pulse in the same view.',
        ]}
        dontItems={[
          'Do not measure the DOM to build a skeleton. The CSS already knows the boxes.',
          'Do not brand the fill with success or danger. A placeholder has no status.',
          'Do not wrap an empty tree. If the data is missing, still pass a shell with placeholder props.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A wrapped tree is a status that stays busy. The children are hidden from assistive tech until loading is false."
      items={[
        'Auto mode sets role status, aria-busy, and a label on the wrapper. Children are aria-hidden and inert.',
        'Bone placeholders without children are aria-hidden. Pass label on a group for Loading profile.',
        'Set loading false to restore the live tree to the accessibility map.',
        'Shimmer and pulse stop when prefers-reduced-motion is set. Use motion none to match that by default.',
      ]}
    />
  ),
}

export const modalGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Modal is the overlay above the page. Dialog is a form or a longer task. Alert is a short decision, like
          iOS. Sheet rises from the bottom. Action is a list of choices with Cancel on its own row. One overlay at a
          time. The page behind it does not scroll.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One job', body: 'A title names the task. Description is one supporting line. Actions finish it.' },
          { title: 'Pick the chrome', body: 'Alert for two choices. Dialog for a field or a list. Sheet for a longer editor. Action for Share, Copy, Delete.' },
          { title: 'Dismiss is a choice', body: 'Backdrop and Escape close a casual dialog. Lock them while work is saving, or when the person must pick an action.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use alert for Delete, Log out, and Discard. Two actions, short labels.',
          'Put the primary action first in a dialog footer. Cancel is the quieter control under it.',
          'Pass icon when the tone is danger, success, or warning and the title does not already say that.',
        ]}
        dontItems={[
          'Do not nest a modal in a modal. Close the first, then open the next.',
          'Do not use a dialog when an inline Alert on the page is enough.',
          'Do not put a second accent color on actions. Primary is blue. Destructive is red. Nothing else.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Modal is a dialog. It takes focus, names itself from the title, and returns focus when it closes."
      items={[
        'The overlay uses role dialog and aria-modal. The title is the accessible name.',
        'Description, when present, is aria-describedby. Body copy is supporting content, not a second heading.',
        'Focus moves into the panel when it opens and restores to the control that opened it.',
        'Tab cycles inside the panel. Escape and the close button dismiss when dismissible is true.',
        'Loading sets aria-busy and blocks dismiss. The busy action keeps a text name, such as Sending.',
        'Do not rely on icon color. The title restates a destructive or successful action.',
      ]}
      keys={[
        { keys: ['Esc'], action: 'Close when dismissible' },
        { keys: ['Tab'], action: 'Move through controls in the panel' },
        { keys: ['Shift', 'Tab'], action: 'Move backward' },
        { keys: ['Enter', 'Space'], action: 'Activate the focused action' },
      ]}
    />
  ),
}

export const commandPaletteGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Command Palette is search that runs a command. Spotlight is a floating field, like macOS. Command is a
          panel with grouped results and keyboard hints. Nav is the site search that replaces the bar, like the
          marketing header. Sheet rises from the bottom on a phone. The trigger is Nav Search — outline in a toolbar,
          icon in a marketing header.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One field', body: 'The person types, arrows through results, and presses Return. Nothing else competes.' },
          { title: 'Match the chrome', body: 'Nav for a marketing header. Command for docs and an app. Spotlight for a system-wide jump. Sheet on a small screen.' },
          { title: 'Stay quiet', body: 'Selected is a gray row, not a second accent. Cancel in nav is Anchor — brand blue. That is the only color besides the results.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Put bordered Nav Search in the bar with shortcut ⌘K. Command Search is that field used as the trigger.',
          'Show Quick Links when the nav field is empty. Filter as soon as the person types.',
          'Keep result labels short. Put the group or a shortcut on the trailing side.',
        ]}
        dontItems={[
          'Do not restyle the trigger. Outline is the default. Use pill, subtle, ghost, or icon when the bar needs them.',
          'Do not stack a second search inside the palette. The top field is the only input.',
          'Do not highlight a row in brand blue. Selected is the hover surface.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Command Palette is a dialog that holds a combobox. Focus stays in the field. Arrows change the active option."
      items={[
        'The overlay uses role dialog. The search field is a combobox with aria-expanded, aria-controls, and aria-activedescendant.',
        'Results use listbox and option. The active row is aria-selected.',
        'Focus moves into the field when it opens and restores to the control that opened it.',
        'Escape and the backdrop, or Cancel in nav, dismiss the overlay. Cancel is Anchor without an href, so it is a button.',
        'Do not rely on the shortcut hint. The trigger still has a text name such as Search.',
      ]}
      keys={[
        { keys: ['⌘', 'K'], action: 'Open from a page that listens for the shortcut' },
        { keys: ['↑', '↓'], action: 'Move the active result' },
        { keys: ['Home', 'End'], action: 'First or last result' },
        { keys: ['Enter'], action: 'Run the active result' },
        { keys: ['Esc'], action: 'Close' },
      ]}
    />
  ),
}

export const confirmDialogGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Confirm Dialog asks the person to choose before a change that cannot be undone, or that is hard to reverse.
          Alert is the default, like iOS. Dialog is a longer explanation. Sheet rises from the bottom. Action is a
          list with Cancel on its own row. Tone is the meaning of the confirm: danger, brand, warning, success, or
          a quiet archive.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Ask once', body: 'The title is the question. The body is one supporting line. The confirm label is the verb.' },
          { title: 'Tone is the risk', body: 'Danger is delete. Brand is publish or send. Warning is leave without saving. Neutral is archive.' },
          { title: 'Two actions, short labels', body: 'Cancel and Confirm. Add a third action only for Don’t save. Never a fourth.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use alert for Delete, Log out, and Discard. Two short labels, stacked or split.',
          'Name the confirm as the verb the person is about to do, such as Delete or Publish.',
          'Lock dismiss while the confirm is saving. The busy action keeps a text name.',
        ]}
        dontItems={[
          'Do not use a confirm for a change that is easy to undo. That is a toast, not a dialog.',
          'Do not put a form in a confirm. That is Modal as a dialog.',
          'Do not label the confirm OK when the action is Delete. The word must match the risk.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Confirm Dialog is a dialog. It takes focus, names itself from the title, and returns focus when it closes."
      items={[
        'The title is the question and the accessible name. The body is supporting copy, not a second heading.',
        'Confirm and Cancel are buttons. The confirm label is the verb, such as Delete or Publish.',
        'Loading sets aria-busy and blocks dismiss. Cancel is disabled until the work finishes.',
        'Do not rely on icon color. The title restates a destructive or successful action.',
        'A third action, if present, is Don’t save or an equivalent. Keep it a short verb.',
      ]}
      keys={[
        { keys: ['Esc'], action: 'Close when dismissible' },
        { keys: ['Tab'], action: 'Move through Confirm, the secondary action, and Cancel' },
        { keys: ['Enter', 'Space'], action: 'Activate the focused action' },
      ]}
    />
  ),
}

export const emptyPopupGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Empty Popup is the compact empty view inside a menu, command palette, or notification panel. Empty State
          is the page. This is the overlay. Fill is the default panel. Subtle, outline, and pill sit as a card.
          Ghost is type and a glyph. Plain surface drops the panel so the empty can live inside an existing menu.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Stay small', body: 'A popup is a glance. One title, one line, one action if needed.' },
          { title: 'Match the menu', body: 'Use surface plain inside Select, a palette, or a sheet that already has chrome.' },
          { title: 'One reason', body: 'No results, an empty inbox, or a failure. Do not mix those stories.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use small in a Select. Use medium in a palette or notification popup.',
          'Name the title as what is missing, such as No results or No notifications.',
          'Use danger only when the popup failed to load.',
        ]}
        dontItems={[
          'Do not use Empty Popup as a full page. That is Empty State.',
          'Do not stack two sentences. The body is one line.',
          'Do not put a form in the popup empty. That is a Modal.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Empty Popup is a status region named by its title. It is not a live alert unless the tone is danger."
      items={[
        'The title is the accessible name. The body is supporting copy.',
        'If there is an action, it is a Button. Keep the label a short verb.',
        'Plain surface does not add a dialog role. The parent menu already has one.',
        'Do not rely on icon color. The title restates a failure such as Could not load.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move to the action' },
        { keys: ['Enter', 'Space'], action: 'Activate the action' },
      ]}
    />
  ),
}

export const avatarGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Avatar is a person in the interface. A photo when you have one, initials from the name, a kit icon, or the
          brand mark when nothing else is known. Fill is the default. Subtle, outline, ghost, and pill change the
          chrome. Presence sits on the corner. Avatar Group stacks faces and folds the rest into a count.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One person', body: 'The name is the accessible label. Initials come from the first and last word.' },
          { title: 'Photo first', body: 'A photo replaces initials. If the file is missing, initials remain.' },
          { title: 'Quiet chrome', body: 'Fill on a page. Ghost in a dense list. Presence is optional, not decoration.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use small in a table or a Select option. Use large in a profile header. Extra large is the picker.',
          'Pass name even when you have a photo so the label stays correct.',
          'Use Avatar Group for a short set of people. Cap the visible faces and let the rest become a count.',
        ]}
        dontItems={[
          'Do not invent a second accent for presence. Online is success. Away is warning. Busy is danger.',
          'Do not use Avatar as a button. Profile Button wraps it when it opens a menu.',
          'Do not crop a logo into an Avatar. That is Brand Logo.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Avatar is an image of a person. The name is the accessible label. Presence is included in that name when it is set."
      items={[
        'The photo is decorative. The name on aria-label is what assistive tech reads.',
        'If there is no name, the avatar is hidden from assistive tech.',
        'Loading sets aria-busy. Disabled is visual only; do not make Avatar the only control.',
        'The group is a list. Each face is a list item. The overflow face is named as N more.',
        'Do not rely on the presence color alone. The label restates online, away, busy, or offline.',
      ]}
    />
  ),
}

export const avatarPickerGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Avatar Picker is how a person adds or changes a profile photo. An empty face is Add photo. A photo with
          onEdit is Edit photo, which should open Avatar Editor. Without onEdit, a second press replaces the file.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One face', body: 'The name is the accessible label of the avatar. The camera button is Add photo or Edit photo.' },
          { title: 'Pick, then crop', body: 'onFile receives the file. Open Avatar Editor with that image. Save writes the crop back to src.' },
          { title: 'Stay on the face', body: 'The control sits on the extra-large avatar. Do not add a second Choose file button beside it.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Pass name even when there is a photo so initials remain if the file fails.',
          'Pass onEdit once a photo exists so the next press opens the cropper, not a new file dialog.',
          'Keep accept to jpeg, png, webp, and gif unless the product needs another type.',
        ]}
        dontItems={[
          'Do not use Avatar alone as the picker. Avatar is not a control.',
          'Do not hide the camera. It is how the person finds Add and Edit.',
          'Do not leave the picker enabled while the editor is saving. Pass disabled.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="The face is an Avatar named from the person. The camera is an Icon Button named Add photo or Edit photo."
      items={[
        'Add photo opens the file dialog. Edit photo calls onEdit when a photo exists.',
        'The file input is visually hidden. The camera button is the only tab stop besides the page.',
        'Disabled dims the camera. It is not operable.',
        'Pass name so the avatar still has a label when there is no photo.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the camera button' },
        { keys: ['Enter', 'Space'], action: 'Add or edit the photo' },
      ]}
    />
  ),
}

export const avatarEditorGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Avatar Editor is the crop sheet. The person moves, zooms, and rotates a photo, then presses Done. Cancel
          and Done sit in Sheet Nav on black. Choose a Different Photo returns to the file dialog. Remove Photo
          clears the face.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One crop', body: 'The circle is the saved face. Pinch or the zoom slider. Drag to reposition. Rotate in 90 degree steps or with the slider.' },
          { title: 'Done writes the file', body: 'onSave receives a jpeg blob at 512px. Close the sheet after it resolves. Keep saving true while you upload.' },
          { title: 'Lock while saving', body: 'Cancel, rotate, and the sliders disable. Done shows Saving. Escape does not dismiss.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Open from Avatar Picker onEdit after a file is chosen, or from Edit photo on an existing src.',
          'Pass onChooseAnother to return to the file dialog. Pass canRemove and onRemove only when a photo already exists.',
          'Keep the sheet on black. Sheet Nav is ghost and onDark.',
        ]}
        dontItems={[
          'Do not nest this sheet in a Modal. It is already a dialog.',
          'Do not leave the overlay open after a failed save without the error line. The editor already shows the message.',
          'Do not crop to a square file and then round it again in Avatar. The editor already exports the circle.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Avatar Editor is a modal dialog named Move and Scale. Focus stays in the sheet until Cancel or Done."
      items={[
        'role dialog and aria-modal. The title is Move and Scale. The subtitle explains pinch and drag.',
        'Cancel, Done, rotate, zoom, and rotation are named controls. Done sets aria-busy while saving.',
        'Escape calls onCancel when the sheet is not busy. The page behind does not scroll.',
        'Choose a Different Photo and Remove Photo are Anchors. Remove uses the danger tone.',
        'The crop canvas is visual. Zoom and Rotation sliders are the accessible way to adjust the crop.',
      ]}
      keys={[
        { keys: ['Esc'], action: 'Close when not saving' },
        { keys: ['Tab'], action: 'Move through Cancel, Done, zoom, rotate, and footer actions' },
        { keys: ['Enter', 'Space'], action: 'Activate the focused action' },
      ]}
    />
  ),
}

export const keyValueRowGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Key Value Row is a label on the left and a value on the right, the same quiet pair Apple uses in Settings
          and About. Fill is the default hairline list. Subtle, outline, and pill sit as a card. Ghost is type with
          no chrome. Wrap a set in Key Value Group so the last row drops its divider.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Read left to right', body: 'The label names the field. The value is the current answer, quieter, and truncates if it is long.' },
          { title: 'One action', body: 'Copyable turns the value blue. A chevron means the row opens something. Do not do both.' },
          { title: 'Group the set', body: 'An account card is a group. A single spec line can stand alone. Do not mix variants inside one group.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill in a settings card. Use pill for a single fact on a page. Use stacked when the value is an address or a long id.',
          'Pass copyable for an email, a key, or an id the person is meant to take with them.',
          'Use Not set when the value is missing. Keep the label. Do not hide the row.',
        ]}
        dontItems={[
          'Do not use a row as a form field. That is Text Field or Settings Row.',
          'Do not put a primary button in the trailing slot. A chevron, a badge, or a check is enough.',
          'Do not mark every value in brand blue. Blue is for copy and links.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="A static row is read as label, then value. A copyable or linked row is a control named from both."
      items={[
        'Copyable is a button. The name is Copy, then the label, then the value. After a copy it becomes Copied.',
        'href renders a link. onClick renders a button. Both include a chevron unless you pass chevron false.',
        'Loading sets aria-busy and replaces the value with a placeholder bone.',
        'Disabled is visual and not operable. Invalid sets aria-invalid and danger type on the value.',
        'Do not rely on color. Not set, Copied, and an error hint restate the state in words.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move to the next copyable or linked row' },
        { keys: ['Enter', 'Space'], action: 'Copy, or activate the row' },
      ]}
    />
  ),
}

export const badgeGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Badge is a compact status, count, or category label. Subtle is the default, the same quiet tint Apple uses in
          Settings and lists. Fill is solid. Outline is a wireframe. Ghost is ink only. Pill is a slightly taller chip.
          Teal is verified. Green is success. Orange is a review. Red is a problem or a count.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One word', body: 'New, Live, Beta, Pro. A badge is a status, not a sentence. The row or heading carries the rest.' },
          { title: 'Teal is verified', body: 'Verified and active use accent teal. Success green is for a completed action. Do not mix them on the same row.' },
          { title: 'Count is a number', body: 'Pass count for a notification. Zero hides it. Overflow becomes 99+.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use subtle in a table or a settings row. Use fill for New or a notification count. Use ghost in a dense list.',
          'Add a leading dot for Live or Active. Use pulse only when the status is happening now.',
          'Keep small in a table. Medium is the default. Large sits next to a heading.',
        ]}
        dontItems={[
          'Do not use teal as a second call to action. It is only for verified, active, and success badges.',
          'Do not put a badge on every row. Reserve it for a state that is not already in the copy.',
          'Do not use danger fill for a category. Danger is an error, a destructive tag, or a notification count.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Badge is a label. The words are the name. A count and a dot-only mark still need a name."
      items={[
        'The label text is the accessible name when it is visible.',
        'A count-only badge uses the formatted number as the name. Zero is hidden, not announced as zero.',
        'A dot-only badge uses the tone as the name, such as verified status. Prefer a visible word when the status matters.',
        'Loading sets aria-busy. Disabled is visual only unless the badge is a control.',
        'onClick turns the badge into a button. onDismiss is a separate remove control with its own label.',
        'Do not rely on color alone. Pair danger with Failed, warning with In review, teal with Verified.',
      ]}
    />
  ),
}

export const statCardGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Stat Card is a headline metric. Fill is the default, the same quiet tile Apple uses for Fitness and Health.
          Subtle, outline, ghost, and pill match the rest of the kit. The number is the story. Delta, hint, icon, and
          sparkline are optional support — never decoration.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One number', body: 'The value is already formatted. A unit sits beside it when the number needs a scale, such as hrs or /mo.' },
          { title: 'Delta is the change', body: 'Up is success. Down is danger. Invert when a drop is the win, such as open tickets. Neutral is unchanged.' },
          { title: 'Quiet chrome', body: 'Fill on a dashboard. Ghost in a dense row. Tone tints the tile only when the metric itself is semantic.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use a grid of fill cards for an overview. Use small in a sidebar. Use large for a single featured number.',
          'Pass invert on a delta when fewer is better. Keep the hint as the period, such as vs last month.',
          'Add an icon or a sparkline when they help scan a set. Keep both optional.',
        ]}
        dontItems={[
          'Do not use Stat Card as a button for a primary action. href and onClick are for opening the detail behind the number.',
          'Do not invent a second accent. Brand is the only interactive color. Success and danger belong to the delta.',
          'Do not leave a loading card after you know the value. Swap loading off. Empty is an em dash, not a zero.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Stat Card is a named metric. The label is the accessible name. The value, delta, and hint are visible support."
      items={[
        'The label is referenced with aria-labelledby. The value is not a heading.',
        'A sparkline is decorative. The delta chip restates the change in text.',
        'href renders a link. onClick renders a button. Disabled and loading are not operable.',
        'Loading sets aria-busy. Empty shows an em dash and keeps the label.',
        'Do not rely on delta color alone. The value string includes the sign or the word unchanged.',
      ]}
    />
  ),
}

export const breadcrumbGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Breadcrumb is the path back through the hierarchy. Ghost is the default, the same quiet trail Apple uses in
          Settings and Finder. Subtle, outline, and fill sit on a surface. Pill is a compact chip trail. The last item
          is the current page. Everything before it is a way back.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'The last item is here', body: 'Current is primary and medium. It is not a link. Ancestors are tertiary until they are hovered or focused.' },
          { title: 'One accent', body: 'Hover and focus use brand blue. Do not underline, and do not paint the current page as a filled button.' },
          { title: 'Collapse, don’t wrap forever', body: 'If the path is long, pass maxItems. The ellipsis holds the middle pages in a menu. Keep the first and last in view.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use ghost on a page. Use subtle or outline in a toolbar or card. Use pill when the trail sits next to other chips.',
          'Pass href or onClick on ancestors so the path is a real way back. Keep the current item as text.',
          'Use a home icon on the first crumb when the root has no useful label. Keep the accessible name.',
        ]}
        dontItems={[
          'Do not use Breadcrumb for peer views. That is Tabs.',
          'Do not put a primary Button in the trail. The current page is already the destination.',
          'Do not show more than one current item. The last crumb is the page.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Breadcrumb is a navigation landmark. The list is an ordered path. The last item is the current page."
      items={[
        'nav with an accessible name, default Breadcrumb. ol holds the crumbs in order.',
        'Ancestors with href render as links. Ancestors with onClick render as buttons. The current page is a span with aria-current="page".',
        'Disabled crumbs are not in the keyboard cycle. They stay visible so the path does not jump.',
        'The ellipsis is a button named Show more pages. It opens a list of the hidden ancestors.',
        'An icon-only crumb still has a text label. The icon is decorative.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move through ancestor links or buttons' },
        { keys: ['Enter', 'Space'], action: 'Follow the focused crumb, or open the overflow' },
        { keys: ['Escape'], action: 'Close the overflow menu' },
      ]}
    />
  ),
}

export const tableGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Table is a structured list of records. Fill is the default — a quiet card with a tinted header, the same
          treatment Apple uses for Music playlists and Admin lists. Subtle and pill sit on a secondary surface.
          Outline is a wireframe. Ghost is rows and hairlines with no chrome.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One object', body: 'Caption, rows, and footer share one frame. Do not float a title above a disconnected table.' },
          { title: 'Hairlines, not boxes', body: 'Rows divide with a subtle line. Selection is a brand-tinted fill. Nothing casts a shadow.' },
          { title: 'Edit in place', body: 'Double-click a cell, or Return or F2 on the focused row. Escape cancels. Tab commits and moves. The value stays in the cell — no dialog.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill on a page. Use subtle or pill inside a card. Use ghost when the table sits under a page header that already names the list.',
          'Use small in a dense log. Use medium for product lists. Use large when each row is a person with an avatar.',
          'Pass editable for inline edits. Mark a Badge or action column editable={false}.',
        ]}
        dontItems={[
          'Do not paint selected rows in teal or a second accent. Brand primary subtle is the only selected fill.',
          'Do not wrap every cell in a card. The row is the unit.',
          'Do not open a modal to rename a cell. Double-click and type.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Table is a region that contains a real table. Headers are column headers. Selected rows are marked. Sortable headers expose aria-sort."
      items={[
        'A caption string becomes the accessible name. Otherwise pass aria-label.',
        'Selectable rows set aria-selected. The header checkbox is mixed when the page is partly selected.',
        'Sortable headers are buttons. aria-sort is ascending, descending, or none.',
        'Disabled rows stay visible and are skipped by arrow keys.',
        'loading sets aria-busy. Empty is a single cell that names the blank view.',
        'Arrow keys move row focus. Left and right move the active cell when the table is editable.',
        'Return or F2 edits the active cell. Double-click does the same. Escape cancels. Tab commits and moves.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move to the table, then through sortable headers and checkboxes' },
        { keys: ['ArrowUp', 'ArrowDown'], action: 'Move between enabled rows' },
        { keys: ['ArrowLeft', 'ArrowRight'], action: 'Move the active cell when editing is on' },
        { keys: ['Home', 'End'], action: 'First or last enabled row' },
        { keys: ['Enter', 'F2'], action: 'Edit the active cell' },
        { keys: ['Escape'], action: 'Cancel the edit' },
        { keys: ['Tab'], action: 'While editing, commit and move to the next cell' },
        { keys: ['Space'], action: 'Select the focused row' },
      ]}
    />
  ),
}

export const pageHeaderGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Page Header is the title of a view. Ghost is the default, the same quiet start Apple uses on Settings and
          Files — type on the page, actions on the trailing edge. Subtle, outline, fill, and pill sit as a card.
          Split puts actions beside the title from tablet up. Stack keeps them under the copy. Center is a hero.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One title', body: 'The heading names the view. The description is one supporting line. Actions are verbs for this page.' },
          { title: 'Deference', body: 'Ghost has no chrome. Use a surface only when the header sits inside a card, not on the page itself.' },
          { title: 'Actions stay few', body: 'One primary button is enough. A secondary action is quieter. Icon buttons are for tools, not a second CTA.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use ghost on a page. Use subtle or outline when the header sits in a card. Use pill for a nested well.',
          'Use small in a nested view or a compact list. Use large only for a hero or a first-run page.',
          'Keep the title short. Put the rest in the description, a badge, or the first row of the page.',
        ]}
        dontItems={[
          'Do not put a second heading in the header. Breadcrumbs, an eyebrow, and the title are enough.',
          'Do not stretch a primary button across the row on desktop. Compact pills sit on the trailing edge.',
          'Do not restyle the title in teal. Brand blue is for the action, not the heading.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Page Header is the heading of the view. The title is a real heading. Actions are buttons the person can reach next."
      items={[
        'The title is an h1 by default. Pass as when the visual size and the document outline disagree.',
        'Eyebrow and description are supporting copy, not headings.',
        'Back is a button named Back. Pass leading for a custom control with its own name.',
        'Loading sets aria-busy. The title stays available to assistive tech as a visually hidden name.',
        'Disabled dims the actions. They stay in the tree.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move to Back, then to each action' },
        { keys: ['Enter', 'Space'], action: 'Activate the focused action' },
      ]}
    />
  ),
}

export const paginationGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Pagination moves through a paged list. Primary is the default — the current page is a filled mark, the
          neighbors stay quiet. When the set is long, the numbers collapse to first, last, and a window around here:
          1 … 12 13 14 … 48. Compact writes the page as a line. Simple is previous and next only.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Keep first and last', body: 'The ends stay visible. The ellipsis is not a control. It only means pages are hidden.' },
          { title: 'One current', body: 'The selected number uses brand fill. Neighbors are secondary until they are hovered.' },
          { title: 'Collapse, don’t wrap', body: 'If there are too many pages, hide the middle. Do not show every number in a wrapping grid.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use numbers under a table or a search result. Use compact in a tight footer. Use simple when the page is already named nearby.',
          'Pass showFirstLast when jumping to the ends matters, such as a long export log.',
          'Disable the control while the next page loads. The current mark can show a spinner.',
        ]}
        dontItems={[
          'Do not use Pagination for peer views. That is Tabs.',
          'Do not list every page when the count is large. The ellipsis is the design.',
          'Do not paint previous and next as primary Buttons. They sit beside the numbers, quiet until pressed.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Pagination is a navigation landmark. Each page is a button. The current page is marked. The ellipsis is not operable."
      items={[
        'nav with an accessible name, default Pagination.',
        'The current page has aria-current="page". Previous, next, first, and last have aria-label.',
        'The ellipsis is a visual gap. It is hidden from assistive tech.',
        'Disabled previous and next stay visible so the control does not jump at the ends.',
        'loading sets aria-busy and disables every control. The current mark shows a spinner.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move through previous, page numbers, and next' },
        { keys: ['Enter', 'Space'], action: 'Go to the focused page' },
      ]}
    />
  ),
}

export const authNavGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Auth Nav is the 44px bar on sign-in and related flows. The mark is Brand Logo. Appearance is Theme Toggle
          compact. The trailing action is Anchor — brand blue, underline on hover. Auth Layout places this bar on the
          page; do not rebuild the row by hand.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Three pieces', body: 'Logo home, theme, optional link. Nothing else belongs in this bar.' },
          { title: 'Use the kit', body: 'Brand Logo, Theme Toggle, and Anchor. Do not restyle a raw header to look like this bar.' },
          { title: 'One destination', body: 'The trailing Anchor is the peer flow: Create one on sign-in, Sign in on create account.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Pass navLinkTo and navLinkLabel for the peer auth page.',
          'Omit both when the flow has no alternate, such as setup.',
          'Keep the bar on the page background. Do not frost it like Site Nav.',
        ]}
        dontItems={[
          'Do not put search, bag, or marketing links here. That is Site Nav.',
          'Do not replace Anchor with a button or a second accent color.',
          'Do not rebuild the row with raw links and a custom switch.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Auth Nav is the header of an auth page. The logo names the product. Theme Toggle names appearance. The trailing Anchor names the peer flow."
      items={[
        'The logo link uses the product name as its accessible label. The mark inside it is decorative.',
        'Theme Toggle compact exposes Light, Dark, and a switch. Do not add a second appearance control in the same header.',
        'The trailing Anchor is a real link with visible text. Do not replace it with an icon-only control.',
        'The bar is 44px tall. Keep hit targets inside that height.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move from the logo to Theme Toggle, then the trailing link' },
        { keys: ['Enter', 'Space'], action: 'Activate the focused control' },
      ]}
    />
  ),
}

export const sheetNavGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Sheet Nav is the bar at the top of a sheet. Cancel, Back, and Done are Anchor — brand blue, underline on
          hover. Close is a quiet dismiss. Back is a nested sheet. Large drops the title below the bar. Prominent fills
          Done as a blue pill.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Blue is the action', body: 'Cancel, Back, and Done are Anchor in brand primary. Close is a gray mark so it does not compete with Done.' },
          { title: 'Title stays centered', body: 'The heading sits in the middle regardless of how wide the actions are. It truncates before it collides.' },
          { title: 'Done is the emphasis', body: 'Done is semibold. Cancel is regular. Prominent fills Done when the sheet is a short create flow.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use plain for Edit, New, and any form that can be cancelled or saved.',
          'Use close when dismiss is the only leading action. Use back when the sheet is nested.',
          'Pass onDark when the sheet sits on black, such as Move and Scale.',
        ]}
        dontItems={[
          'Do not restyle Done as teal or a second accent. Brand blue is the only action color.',
          'Do not put a second title in the sheet body. The bar already names the task.',
          'Do not hide Cancel while work is saving. Disable it. The person still needs a way out after the wait.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Sheet Nav is the heading row of a dialog. The title names the sheet. Each action has a text name."
      items={[
        'The title is visible text in the header. Use it as the accessible name of the sheet.',
        'Cancel, Close, and Back are Anchor without an href, so they render as buttons. All three call onCancel.',
        'Done sets aria-busy while loading. The label stays a word, such as Saving.',
        'Disabled actions stay in the tree. They are not removed while the sheet is busy.',
        'The title truncates visually. Keep the heading short so it is not cut off.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move between Cancel and Done' },
        { keys: ['Enter', 'Space'], action: 'Activate the focused action' },
        { keys: ['Esc'], action: 'Dismiss the sheet when the parent allows it' },
      ]}
    />
  ),
}

export const profileButtonGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Profile Button is the account control. Avatar is the default — a face that opens a menu. Fill is the
          toolbar ring. Ghost is the photo alone. Labeled adds the name. Menu adds a caret. Identity is the
          Settings row: name, email, and a caret. Presence and a badge sit on the face.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'One person', body: 'The name is the accessible label. A photo replaces initials. Presence is optional.' },
          { title: 'Avatar in chrome', body: 'Use avatar in a top bar. Use labeled or menu in a header. Identity is a row.' },
          { title: 'The caret means a menu', body: 'Menu and identity set aria-haspopup. Pass open while the menu is visible.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use small in a 52px nav. Use medium when the control stands alone. Large is a settings row.',
          'Pass name even when you have a photo so the label stays correct.',
          'Use a badge for unread account notices. Keep the number short.',
        ]}
        dontItems={[
          'Do not use Avatar as the button. Profile Button owns the hit target and the name.',
          'Do not put a second accent on the face. Tone is for initials. Presence is status.',
          'Do not hide the caret on a menu trigger. The caret is how the menu is announced visually.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Profile Button is a native button. The name is the accessible label. Presence and email are included in that name when they are set."
      items={[
        'aria-label is built from the name, subtitle, and presence. Override it only when the action is not “open profile”.',
        'Menu and identity set aria-haspopup="menu". Pass open to set aria-expanded while the menu is visible.',
        'Loading sets aria-busy and replaces the face with a spinner. Disabled is not focusable.',
        'The photo, initials, caret, and badge are decorative. The button name still makes sense if they are empty.',
        'Tab to focus, Space or Enter to press. Do not nest another control inside the button.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move focus to the control' },
        { keys: ['Space'], action: 'Activate' },
        { keys: ['Enter'], action: 'Activate' },
      ]}
    />
  ),
}

export const tabsGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Tabs switch between peer views. Underline is the default, the same sliding bar Apple uses in Safari and
          Finder. Subtle, outline, and pill sit in a well. Ghost is type only. Keep the row to a sidebar column when
          it sits beside a list. Use Segmented Control when the set is a filter of two to five options, not a change
          of view.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Peer views', body: 'Each tab is a whole view. The selected label names what is on screen.' },
          { title: 'One row', body: 'Tabs stay on one row. If the row is tight, labels truncate. Keep the set short enough to scan.' },
          { title: 'The bar follows', body: 'The indicator moves with the selected tab. Do not restyle it as a second accent.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use underline on a page. Use subtle or pill in a card or a toolbar.',
          'Use a badge for a count, such as unread. Keep the number short.',
          'Disable a tab rather than hiding it, so the set stays stable.',
        ]}
        dontItems={[
          'Do not use Tabs for two to five filters that stay on one view. That is Segmented Control.',
          'Do not put a primary Button inside the tab list.',
          'Do not use Icon Tab here. That is the compact bar at the bottom of an app shell.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Tabs is a tablist. One tab is selected. Arrow keys move to the next enabled tab. The page owns the panel."
      items={[
        'role="tablist" on the row, role="tab" on each tab, aria-selected on the selected id.',
        'Only the selected tab is in the tab order. Arrow keys, Home, and End move selection.',
        'Disabled tabs are not in the keyboard cycle. The list can also be disabled as a whole.',
        'Pass aria-label when there is no visible heading that names the set.',
        'A badge is a count. The tab label still names the view.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the selected tab' },
        { keys: ['ArrowLeft', 'ArrowRight'], action: 'Move to the next enabled tab' },
        { keys: ['Home', 'End'], action: 'First or last enabled tab' },
        { keys: ['Enter', 'Space'], action: 'Select the focused tab' },
      ]}
    />
  ),
}

export const sidebarNavGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Sidebar Nav is the primary wayfinding for an app shell. It is full height, from the brand at the top to
          the account or appearance control at the foot. Fill is the default, the same gray column Apple uses in
          Mail and Settings. Subtle, outline, ghost, and pill change the chrome. Collapse it to a rail of icons
          when the canvas needs the width.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'The brand lives here', body: 'The mark sits in the sidebar, not in the top bar. The two edges meet at 52px so the shell reads as one frame.' },
          { title: 'One selected place', body: 'The current item uses the brand tint. Hover and press stay gray. Danger is only for a destination such as Log out.' },
          { title: 'Groups, not a pile', body: 'Section labels make a long list scannable. Collapse a group only when the person asked for it.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use fill on a page. Use subtle when the sidebar should sit on white. Use pill when it should float inside the shell.',
          'Keep labels short. A badge is a count, not a status sentence.',
          'Put Theme Toggle or the signed-in person at the foot. Do not duplicate the brand in the top bar.',
        ]}
        dontItems={[
          'Do not put the brand in both the sidebar and the top bar.',
          'Do not use Sidebar Nav for peer views of one page. That is Tabs.',
          'Do not paint the selected row in a second accent. Brand is the only tint.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Sidebar Nav is a navigation landmark. The selected item is the current page. Collapse is a separate control."
      items={[
        'The aside is labeled Sidebar. Each item is a button. aria-current="page" marks the selected id.',
        'Disabled items stay visible and are not in the click cycle.',
        'The collapse control is an icon button. Expanded announces Collapse sidebar. Collapsed announces Expand sidebar.',
        'A badge is a count. The item label still names the destination.',
        'In the rail, the visible label is hidden. The button title and accessible name remain the same string.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Move through items, search, and collapse' },
        { keys: ['Enter', 'Space'], action: 'Select the focused item, or toggle collapse' },
        { keys: ['Escape'], action: 'Close the mobile drawer' },
      ]}
    />
  ),
}

export const navSearchGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Nav Search is the compact field in a top bar. Pill is the default, the same capsule as Finder and Safari.
          Subtle sits on a card. Outline holds an edge on a busy chrome. Ghost stays quiet until hover. Icon collapses
          to a magnifying glass and opens on focus. Pair it with a toolbar — not with a form label.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Toolbar, not form', body: 'This is a find control in chrome. Use Text Field with the pill variant when search lives in a page or a modal.' },
          { title: 'Clear in place', body: 'A filled query shows the gray clear mark. Escape clears, then blurs. Do not add a second Cancel beside it.' },
          { title: 'One width', body: 'Small fits a 52px bar. Medium is the standard toolbar. Large is a touch target. Do not stretch it across the nav.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use pill in a compact top bar. Use icon in a marketing header where space is the constraint.',
          'Pass shortcut when a command palette is bound to the same query, such as ⌘K.',
          'Show loading by replacing the glass with the spinner while results resolve.',
        ]}
        dontItems={[
          'Do not use Nav Search as the only field on a settings page. That is Text Field.',
          'Do not hide the glass. The glyph is how the control reads as search at a glance.',
          'Do not mix a custom height. Small, medium, and large already match the bar.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="Nav Search is a labeled search input. The placeholder is a hint. The accessible name is the label, or the placeholder when no label is passed."
      items={[
        'Native type="search" input. The wrapping label points at it with htmlFor.',
        'Focus is a 2px brand ring on the field. Icon variant expands on focus and collapses on blur when empty.',
        'Clear is a button with the name “Clear search”. It is out of the tab order so typing is not interrupted. Escape clears first.',
        'Loading sets aria-busy on the field. The spinner is decorative.',
        'Disabled is not operable. Shortcut text is hidden from assistive tech — it is a visual hint only.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the field. Icon variant expands.' },
        { keys: ['Escape'], action: 'Clear the query, then collapse or blur' },
        { keys: ['Enter'], action: 'Submit the current query' },
      ]}
    />
  ),
}

export const iconTabGuide = {
  usage: (
    <DocsUsage>
      <DocsProse>
        <Body>
          Icon Tab is the compact destination bar at the bottom of an app shell. Ghost is the default — icon over a
          short label, selected in brand. Subtle, outline, and pill sit in a well with a sliding thumb. Fill paints
          the selected item. Use Tabs when the views are peers of one page, not places in the app.
        </Body>
      </DocsProse>
      <DocsPrinciples
        items={[
          { title: 'Places, not filters', body: 'Each item is a destination. Home, Inbox, Profile — not All, Live, Review.' },
          { title: 'Stacked first', body: 'Icon above a 10–12px caption is the phone bar. Inline and icon are for a toolbar.' },
          { title: 'One tint', body: 'Selected is brand. Danger is only for a destructive destination such as Log out.' },
        ]}
      />
      <DocsDoDont
        doItems={[
          'Use IconTabBar for a set. Keep three to five items so each label stays readable.',
          'Pass a badge for a count on the icon. Keep the number short.',
          'Use inline in a compact toolbar. Use icon when the label would repeat a nearby heading.',
        ]}
        dontItems={[
          'Do not use Icon Tab for peer views of one list. That is Tabs.',
          'Do not mix a primary Button into the bar.',
          'Do not leave the selected item in gray. The tint is the wayfinding.',
        ]}
      />
    </DocsUsage>
  ),
  accessibility: (
    <A11ySection
      intro="IconTabBar is a tablist. One destination is selected. Arrow keys move to the next enabled item. The page owns the panel."
      items={[
        'role="tablist" on the bar, role="tab" on each item, aria-selected on the selected id.',
        'Only the selected tab is in the tab order. Arrow keys, Home, and End move selection.',
        'Stacked and inline show the label. Icon layout uses aria-label from the same string.',
        'A badge is a count. The tab label still names the destination.',
        'Standalone IconTab is a button. Use it for a single control, such as Log out beside the bar.',
      ]}
      keys={[
        { keys: ['Tab'], action: 'Focus the selected destination' },
        { keys: ['ArrowLeft', 'ArrowRight'], action: 'Move to the next enabled item' },
        { keys: ['Home', 'End'], action: 'First or last enabled item' },
        { keys: ['Enter', 'Space'], action: 'Select the focused item' },
      ]}
    />
  ),
}


