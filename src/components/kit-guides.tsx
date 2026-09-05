import { Card, CardGrid } from './Card'
import { Alert } from './Alert'
import { DataTable } from './DataTable'
import { Kbd } from './Kbd'
import { RuleCard } from './RuleCard'
import { DocsInlineCode, DocsUsage } from './DocsCard'
import { Body } from './Text'

const SHORTCUT_COLUMNS = [
  {
    key: 'keys',
    header: 'Key',
    render: (row: { id: string; keys: string[]; action: string }) => (
      <span className="inline-flex flex-wrap items-center gap-1">
        {row.keys.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </span>
    ),
  },
  { key: 'action', header: 'Action' },
]

export const headingGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Heading is the page or section title. Display is a marketing hero. H1 is the page. H2 is a section. H3 is a
          card. Pass <DocsInlineCode>as</DocsInlineCode> when the visual size and the document outline
          disagree.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One H1" description="Each page has a single h1. Display also renders h1 — do not stack both." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Follow with subhead" description="A heading states the idea. Subhead supports it in one line." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Do not skip" description="H1 then H2 then H3. Never jump a level to get a smaller size." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use level={1} for the page title.',
          'Use level="display" once, on a marketing hero.',
          'Keep heading copy short — the subhead carries detail.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not style Body as a heading.',
          'Do not use display inside a card or modal.',
          'Do not change font-size; change level.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Screen readers build a map from heading tags, not from how large the type looks."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Heading emits a real h1, h2, or h3. Display is an h1."}</li>
        <li>{"If the design needs H3 size but H2 rank, pass as=\"h2\" and level={3}."}</li>
        <li>{"Pages include exactly one h1 (or one display)."}</li>
        <li>{"Color tone is optional emphasis. The words remain the title without it."}</li>
      </ul>
    </Alert>
  ),
}

export const subheadGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Subhead sits directly under a heading. One supporting sentence, then a primary action if the screen needs
          one. It is not a second heading.
        </Body>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Keep it to one or two lines.',
          'Default tone is secondary so the heading stays first.',
          'Use it on empty states, auth, and marketing heroes.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Subhead as the only title on the page.',
          'Do not stack three subheads under one heading.',
          'Do not set it to a heading tag.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <ul className="m-0 list-disc space-y-1.5 pl-4">
        <li>{"Subhead renders a paragraph, not a heading. The Heading above it owns the outline."}</li>
        <li>{"Do not replace a missing h2 with a bold subhead."}</li>
        <li>{"Secondary tone is still readable against the page background in both themes."}</li>
      </ul>
    </Alert>
  ),
}

export const bodyGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Body is the reading size. Use size md for paragraphs and sm for denser copy inside cards. Measure lines near
          692px. Short sentences, one idea each.
        </Body>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use Body for any paragraph the user is meant to read.',
          'Use size="sm" inside cards, dialogs, and form hints that are still essential.',
          'Prefer secondary tone for supporting copy, primary when the paragraph is the content.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Caption for a paragraph because it looks quieter.',
          'Do not set custom line-height or tracking.',
          'Do not put a call to action inside a body paragraph — use a Button.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <ul className="m-0 list-disc space-y-1.5 pl-4">
        <li>{"Body is a paragraph. Do not use it as a fake heading."}</li>
        <li>{"17px / 19px meets reading size. Do not shrink it to fit more copy."}</li>
        <li>{"Link tone is for an inline Anchor, not for whole paragraphs."}</li>
        <li>{"Disabled tone is for inert UI copy, not for de-emphasizing a message."}</li>
      </ul>
    </Alert>
  ),
}

export const captionGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Caption is 12px meta: timestamps, counts, and hints. If the user cannot complete the task without it, it is
          not a caption — use Body or a FieldHint.
        </Body>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Pair a caption with the object it describes, close in the layout.',
          'Use danger tone only when the caption restates an error already announced.',
          'Keep it to a single line when you can.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put legal copy or instructions exclusively in a caption.',
          'Do not use caption as a button label.',
          'Do not reduce opacity further — tertiary is already the quiet tone.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <ul className="m-0 list-disc space-y-1.5 pl-4">
        <li>{"12px is supporting. Do not rely on it as the only error text for a field — FieldHint or Alert owns that."}</li>
        <li>{"If a caption names a live region (last saved, member count), keep the wording specific."}</li>
        <li>{"Do not use caption color alone to mark an error."}</li>
      </ul>
    </Alert>
  ),
}

export const eyebrowGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Eyebrow is a short uppercase label above a heading. Product, section, or kicker — not a sentence. It never
          replaces the heading.
        </Body>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Keep it to a few words: Product, New, Components / Typography.',
          'Place it immediately above the heading it introduces.',
          'Use the default tertiary tone unless it is a status kicker.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not write a full sentence in an eyebrow.',
          'Do not use it as the page h1.',
          'Do not track or uppercase by hand — the variant already does.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <ul className="m-0 list-disc space-y-1.5 pl-4">
        <li>{"Eyebrow is a paragraph, not a heading. Screen readers will not treat it as a section."}</li>
        <li>{"Uppercase is visual. Write the words in normal case in the DOM if you need a friendlier announcement — or keep the kicker short."}</li>
        <li>{"Do not rely on letter-spacing to make a long string readable."}</li>
      </ul>
    </Alert>
  ),
}

export const labelGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Label is 17px medium for controls and fields. Prefer FieldLabel in forms so the hint, error, and input stay
          associated. Use Label on its own for chrome: tabs, settings titles, empty-state actions.
        </Body>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use htmlFor when Label wraps or sits beside a native control.',
          'Match the control size: 17px label, 44px field.',
          'Use disabled tone only when the field itself is disabled.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Label for a paragraph of help text — that is Body or Caption.',
          'Do not hide the label and rely on placeholder alone.',
          'Do not nest a Label inside a button that already has a name.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <ul className="m-0 list-disc space-y-1.5 pl-4">
        <li>{"Visible labels beat aria-label when the control is on screen."}</li>
        <li>{"Pass htmlFor or wrap the control so assistive tech can find it."}</li>
        <li>{"Disabled tone must match a disabled control, not a hint you want to quiet."}</li>
      </ul>
    </Alert>
  ),
}

export const iconButtonGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Icon Button is a 44px (or 32px small) control with no visible text. The label prop is required — it is the
          accessible name. Use onAction when the press should show a spinner, then a check or X.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Always name it" description="label is not optional. “Search”, “Copy”, “Delete” — a verb the user understands." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Ghost in chrome" description="Ghost and subtle sit in toolbars. Primary is a rare standalone action." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Feedback" description="onAction replaces the glyph while work runs. Do not also toast the same success unless the result is off-screen." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use Icon Button for a single, obvious glyph action.',
          'Use Button when the action needs a word.',
          'Use danger only for destructive actions, and confirm when the result is hard to undo.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not omit label.',
          'Do not put two glyphs in one Icon Button.',
          'Do not use a small size for a primary destructive action.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"There is no visible text, so the accessible name has to do all the work."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"label becomes aria-label. It must describe the action, not the icon (“Search”, not “Magnifying glass”)."}</li>
          <li>{"Native button. Tab to focus, Space or Enter to press."}</li>
          <li>{"Loading, success, and error disable the control and expose a busy or status overlay."}</li>
          <li>{"Badge counts are extra. The name still makes sense if the badge is empty."}</li>
          <li>{"Disabled is not focusable. Prefer explaining why in nearby copy over a silent disabled icon."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move focus to the control" },
          { id: '1', keys: ["Space"], action: "Activate" },
          { id: '2', keys: ["Enter"], action: "Activate" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const switchGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Switch is an immediate on/off. The change applies now — do not put a Save button after it. Use SwitchItem
          inside SwitchGroup when several settings share a list. Danger is only for a setting that turns on a
          destructive mode.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Immediate" description="Flipping the switch is the commit. If the user needs to review, use a checkbox in a form." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Named" description="Standalone Switch needs label. SwitchItem uses title (and optional description)." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Loading" description="While a network write runs, loading holds the thumb and blocks a second flip." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Put the title on the left, the switch on the right, in a settings row.',
          'Use outline or subtle when the row already has enough contrast.',
          'Use danger only when on means something destructive.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a switch for “agree to terms” — that is a checkbox.',
          'Do not require a second confirm for a routine preference.',
          'Do not leave label empty on a standalone switch.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"A switch is not a checkbox. It announces on and off, and it applies immediately."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"role=\"switch\" with aria-checked. Provide label or a visible SwitchItem title."}</li>
          <li>{"Space and Enter toggle. Pointer down also toggles so the thumb can track the press."}</li>
          <li>{"Disabled and loading are not operable. Loading keeps the name and exposes a busy spinner in the thumb."}</li>
          <li>{"Do not rely on track color alone — the thumb position is the state, and the name includes the setting."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the switch" },
          { id: '1', keys: ["Space"], action: "Toggle on or off" },
          { id: '2', keys: ["Enter"], action: "Toggle on or off" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const numberFieldGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Number Field is a typed value with stepper arrows, like a browser number input. The unit sits
          beside the digits — none, percent, currency, degree, or pixels. Stacked chevrons match the
          desktop field. Split minus and plus is the compact quantity control.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Same chrome as Text Field" description="Outline, subtle, ghost, underline, and pill. Invalid and valid use the same danger and success rings." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Fits the digits" description="The field grows with the value. Each chrome has a cap — past that, extra digits clip like a text field." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Step, then type" description="Arrows and keys move by step. Typing is free until blur, then the value snaps and clamps." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use stacked chevrons in a form. Use split minus and plus for a quantity in a row.',
          'Pass unit="percent" or unit="currency" instead of drawing the sign yourself.',
          'Leave width at fit. Pass width="fill" only when the field must span the row.',
          'Set min, max, and step so the arrows always land on a legal value.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use native input type="number". The browser spinner cannot match the kit.',
          'Do not use a slider when the user must type an exact figure. That is this field.',
          'Do not hide the unit in the placeholder. The suffix stays visible after the value is filled.',
          'Do not stretch the field by default. Fit is the size. Fill is the exception.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"The field is a spinbutton. The value can be typed or stepped. The unit is visible text, not the only name."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The input has role=\"spinbutton\" with aria-valuemin, aria-valuemax, aria-valuenow, and aria-valuetext including the unit."}</li>
          <li>{"Arrow Up and Arrow Down move by step. Page Up and Page Down jump by ten steps. Home and End go to min and max when set."}</li>
          <li>{"Stepper buttons are not in the tab order. They keep focus on the input. Disabled arrows at min or max stay visible."}</li>
          <li>{"Focus is a 2px brand ring on the field. Invalid uses a danger ring and aria-invalid."}</li>
          <li>{"Pass aria-label or a visible Field Label. The unit is extra, not the accessible name."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field" },
          { id: '1', keys: ["ArrowUp", "ArrowDown"], action: "Increase or decrease by one step" },
          { id: '2', keys: ["PageUp", "PageDown"], action: "Jump by ten steps" },
          { id: '3', keys: ["Home", "End"], action: "Jump to the minimum or maximum" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const sliderGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Slider picks a number along a track. Pair it with a Number Field when the exact figure
          matters — the field sits at the end, the start, or on both ends of a range. Fill is the
          default track. Subtle, outline, ghost, and pill match the rest of the form chrome.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One value or two" description="Single mode is a number. Range is a pair that cannot cross." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Type when it matters" description="Pass field to attach a Number Field. The field fits the digits and grows up to a cap. Chrome, stepper, align, and width are the same props as Number Field." />
        <Card variant="subtle" size="sm" eyebrow="03" title="On dark" description={'tone="onDark" is for a black surface, such as the avatar editor.'} />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill in most forms. Subtle on a card. Ghost in a dense list. Pill when the track should feel like a switch.',
          'Pass field when the user must type or step an exact value. Use unit for percent, currency, and px. Pass fieldVariant, fieldStepper, fieldAlign, and fieldWidth to match Number Field.',
          'Keep step coarse enough to land on with a thumb. Use a smaller step only when the value is continuous, such as zoom.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a slider for a small set of named options. That is a segmented control or a radio group.',
          'Do not put a Number Field next to a slider by hand. Pass field so the value, step, and bounds stay in sync.',
          'Do not stack two single sliders when the values are a min and a max. Use Range Slider with field="both".',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Each thumb is a slider. Pair a Number Field when the value must be typed. Arrow keys move by step. Home and End jump to the ends of the track."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Each thumb has role=\"slider\" with aria-valuemin, aria-valuemax, aria-valuenow, and aria-valuetext."}</li>
          <li>{"Range exposes two thumbs. Tab moves between them. They cannot cross."}</li>
          <li>{"Focus is a 2px brand ring. Invalid uses a danger ring and aria-invalid."}</li>
          <li>{"When field is set, the Number Field is the spinbutton. The thumbs stay pointer-only so the value is not announced twice."}</li>
          <li>{"Disabled is not operable. Explain why in nearby copy instead of a silent lock."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus a thumb, or the Number Field when field is set" },
          { id: '1', keys: ["ArrowLeft", "ArrowRight"], action: "Move a thumb by one step" },
          { id: '2', keys: ["ArrowUp", "ArrowDown"], action: "Step the Number Field by one step" },
          { id: '3', keys: ["Home", "End"], action: "Jump to the minimum or maximum" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const segmentedGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Segmented Control picks one option from a small set. Inset is a sliding thumb. Grouped is joined buttons.
          Pair it with Icon Button and Button in SegmentedToolbar when the view needs filters and an action together.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Two to five" description="If there are more options, use Tabs or Select." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Same height" description="Medium is 44px, matching Button and Text Field." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Actions are extra" description="onAction shows a spinner on the pressed segment. Arrow keys only move selection." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use icon-only when every option has a unique, understood glyph, and still pass a text label.',
          'Use grouped beside a primary Button in a toolbar.',
          'Disable a single option rather than hiding it, so the set stays stable.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use it for binary on/off — that is Switch.',
          'Do not wrap to a second line of segments.',
          'Do not fire a network call on every arrow key. Use onAction for press.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"This is a radiogroup. One option is selected. Icon-only segments still have a text name."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"role=\"radiogroup\" on the track, role=\"radio\" on each segment, aria-checked on the selected value."}</li>
          <li>{"Pass label for a visible caption, or aria-label when the control stands alone."}</li>
          <li>{"Icon-only content uses each option’s label as aria-label."}</li>
          <li>{"Disabled options and a loading segment are not in the keyboard cycle."}</li>
          <li>{"Arrow keys move selection. Enter or Space runs onAction if you provided one."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the selected segment" },
          { id: '1', keys: ["ArrowLeft", "ArrowRight"], action: "Move selection" },
          { id: '2', keys: ["Home", "End"], action: "First or last enabled option" },
          { id: '3', keys: ["Enter", "Space"], action: "Press the selected segment (runs onAction)" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const confirmActionGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Confirm Action is a two-tap commit on the same control. First press asks. Second press runs onConfirm. Use
          it for remove, sign out, and other reversible-enough row actions. Use Confirm Dialog when the consequence
          needs a title and a body.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Same control" description="The label becomes Confirm? The user does not hunt for a second button." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Tone is the risk" description="Danger for delete. Brand for a product-owned commit. Neutral for quiet lists." />
        <Card variant="subtle" size="sm" eyebrow="03" title="It resets" description="If the second tap never comes, the control returns to the original label after resetMs." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use text or ghost in a list row. Text is Anchor until the confirm tap. Solid when the action is the focus of the screen.',
          'Name the first label as the verb: Remove, Sign out, Disconnect.',
          'Use loading on the second tap when the request is in flight.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use it for the primary happy-path submit — that is Button.',
          'Do not skip the confirm step by defaulting to solid unless the screen is already a confirm.',
          'Do not place two Confirm Actions that look identical in one row.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"The control is still one button. Pressed state tells assistive tech the confirm step is armed."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Native button. aria-pressed is true while waiting for the second tap."}</li>
          <li>{"The visible label changes to confirmLabel. Keep that string a question or a clear second verb."}</li>
          <li>{"aria-busy while loading. Disabled while loading so a third tap cannot double-submit."}</li>
          <li>{"Escape is not handled here — the timer resets. In a dialog, use Confirm Dialog instead."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the control" },
          { id: '1', keys: ["Enter", "Space"], action: "Arm, then confirm on the second press" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const brandLogoGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Brand Logo is the product mark, wordmark, or lockup. Use lockup in a header. Use mark or icon when space is
          tight. Keep size 20 in nav, larger only in empty or marketing heroes.
        </Body>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Link the logo to home and give the link an accessible name such as “DevKit home”.',
          'Use the lockup when the product name is not already in the nearby heading.',
          'Keep one logo treatment per header.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not recolor the mark with a second accent.',
          'Do not animate the logo on every page load.',
          'Do not pair the wordmark with a duplicate text title in the same row.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <ul className="m-0 list-disc space-y-1.5 pl-4">
        <li>{"If the logo is inside a link, the link has the name. Decorative marks inside that link can be aria-hidden."}</li>
        <li>{"If the logo is not a link, provide text nearby or an aria-label on the image."}</li>
        <li>{"Do not rely on color in the mark to convey the product name."}</li>
      </ul>
    </Alert>
  ),
}

export const themeToggleGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Theme Toggle is the labeled appearance control. Default and compact belong in a sidebar or settings. Switch
          is the track alone when the row already has a title. Theme Icon Toggle is the toolbar counterpart.
        </Body>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Put it where appearance is expected: settings, sidebar foot, or app chrome.',
          'Use labels or icons when the control must read without a separate heading.',
          'Persist through the kit theme — do not fork a second localStorage key.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not place both Theme Toggle and Theme Icon Toggle in the same header.',
          'Do not invent a third “system” control unless the product actually follows OS appearance.',
          'Do not change theme on hover.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <ul className="m-0 list-disc space-y-1.5 pl-4">
          <li>{"The switch exposes on/off for dark. Visible Light and Dark labels (or icons) name both ends."}</li>
          <li>{"Keyboard: Tab to the switch, Space or Enter to toggle."}</li>
          <li>{"The html data-theme attribute updates for the whole document. Do not announce a live region on every toggle."}</li>
          <li>{"Disabled prevents change and is not focusable."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the switch" },
          { id: '1', keys: ["Space", "Enter"], action: "Toggle light and dark" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const themeIconToggleGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Theme Icon Toggle is compact appearance chrome. Ghost, subtle, and outline swap one icon. Pair, segmented,
          and split show both sun and moon. Use pair in an app or marketing header.
        </Body>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use pair or segmented when both states should stay visible.',
          'Use ghost in an already-busy icon toolbar.',
          'Match the 44px height of nearby Icon Buttons.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use this next to a full Theme Toggle.',
          'Do not rely on the glyph alone in a settings page — use Theme Toggle there.',
          'Do not change the icons to arbitrary glyphs.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <ul className="m-0 list-disc space-y-1.5 pl-4">
          <li>{"Single-icon variants name the action (for example, switch to dark). Pair and segmented name each option."}</li>
          <li>{"Keyboard matches Icon Button or Segmented Control, depending on variant."}</li>
          <li>{"Pressed or selected state must be exposed — do not use color inversion as the only selected cue."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the control" },
          { id: '1', keys: ["Space", "Enter"], action: "Toggle, or select the focused segment" },
          { id: '2', keys: ["ArrowLeft", "ArrowRight"], action: "Move between sun and moon on pair, segmented, and split" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const checkboxGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Checkbox is a choice the user reviews before submitting. Several can be on at once. Use mixed when a parent
          stands for a set that is only partly selected. Danger is only for a destructive acknowledgement.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Form first" description="The change waits for Submit. If it should apply now, use Switch." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Named" description="Pass label, or an aria-label when the words sit elsewhere in the row." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Mixed is a parent" description="Indeterminate is for select all, not a third stored value." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use outline in forms, subtle on a secondary surface, ghost in a dense list.',
          'Use mixed on a parent when some, but not all, children are selected.',
          'Mark invalid when the field is required and still off after submit.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a checkbox for an immediate preference. That is a switch.',
          'Do not store mixed as a value. Resolve it to on or off when the user presses.',
          'Do not use danger for a routine opt in.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"A checkbox is a native control. Keep the label in the same label element, or name it with aria-label."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Uses a native checkbox. Space toggles. Tab moves focus. Focus is a 2px brand ring."}</li>
          <li>{"indeterminate sets aria-checked to mixed. The minus is extra. The name still describes the set."}</li>
          <li>{"invalid sets aria-invalid. Repeat the error in Field Hint. Color is not the only signal."}</li>
          <li>{"Disabled is not operable. Explain why in nearby copy instead of a silent lock."}</li>
          <li>{"The hit target is at least 44px tall, including the label."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the checkbox" },
          { id: '1', keys: ["Space"], action: "Toggle on, off, or resolve mixed" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const radioGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Radio picks one option from a small set. The selected control is a ring with a disc inside, not a filled
          circle. Keep the set in a Radio Group so the name and the keyboard stay together.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One of a set" description="Two to five options. If there are more, use Select. If several can be on, use Checkbox." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Named group" description="Every radio in the set shares name. Wrap them in Radio Group and pass a group label." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Ring and disc" description="Selected is a brand ring and an inner disc. That is how it differs from Checkbox." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use outline in forms, subtle on a card, ghost in a dense list.',
          'Put the most common option first, and select it by default when a choice is required.',
          'Use danger only when the choice itself is destructive.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a radio for on or off. That is a switch or a checkbox.',
          'Do not allow an empty selection in a required set. Keep one option selected.',
          'Do not mix radios that do not share a name in one group.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"A radio is a native control in a radiogroup. Arrow keys move within the set. Space selects."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Wrap the set in Radio Group so it exposes role=\"radiogroup\" and a group name."}</li>
          <li>{"Every option shares the same name. The checked option is the value."}</li>
          <li>{"Tab lands on the selected option. Arrow keys move to the next. Space selects the focused option."}</li>
          <li>{"Focus is a 2px brand ring. Invalid uses a danger ring and aria-invalid."}</li>
          <li>{"The hit target is at least 44px tall, including the label."}</li>
          <li>{"Disabled options stay visible. Do not remove the only selected option without selecting another."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the selected radio in the group" },
          { id: '1', keys: ["ArrowUp", "ArrowDown"], action: "Move to the previous or next option" },
          { id: '2', keys: ["Space"], action: "Select the focused option" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const fieldLabelGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Field Label names a control. Pair it with Field Hint under the field, and Form Field to keep the three
          together. Optional is a suffix. Required is an asterisk. The hint carries success, warning, and error — not
          the label, unless the whole field is in that state.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Always visible" description="A placeholder is not a label. Keep the words on screen, even on a search field — or hide them with visuallyHidden so the name still exists." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Hint under the field" description="Help, success, and errors sit in Field Hint. Color is extra. The words are the signal." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Match the field" description="Small, medium, and large follow Text Field. Disabled, invalid, and valid on Form Field should match the control." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Pass htmlFor so the label focuses the control.',
          'Use Optional for a field the user can skip. Use required after submit when the field is empty.',
          'Put two related fields in Field Row. Use inline when the label should sit beside a compact control.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not rely on placeholder alone.',
          'Do not put the error only in the label color. Repeat it in Field Hint.',
          'Do not mix Optional and a required asterisk on the same label.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"A field is named by its label. The hint is supporting text, not a second name."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Use a native label with htmlFor, or wrap the control. Prefer visible text over aria-label when the field is on screen."}</li>
        <li>{"visuallyHidden keeps the name for assistive tech when the layout has no room for a caption."}</li>
        <li>{"The required asterisk is aria-hidden. Mark the control required or aria-required so the requirement is announced."}</li>
        <li>{"Repeat errors in Field Hint. invalid on the label is color only. Set aria-invalid on the control."}</li>
        <li>{"Disabled tone is only for a disabled control. Do not mute a label the user can still edit."}</li>
      </ul>
    </Alert>
  ),
}

export const otpGuide = {
  usage: (
    <DocsUsage>
        <Body>
          OTP Boxes is a one-time code. One digit per box. Paste fills the row. Outline is the default in auth.
          Underline is the quieter layout. Mark invalid and shake only after a failed check.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One digit" description="Each box holds a single number. Paste a full code and it splits across the row." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Advance on type" description="A digit moves focus to the next box. Backspace clears, then steps back." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Error after check" description="Invalid and shake run when the server rejects the code, not while the user is still typing." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use six boxes for authenticator apps. Use four only when the product always sends four.',
          'Use outline on a sign-in page. Use underline when the layout is already quiet.',
          'Call onComplete when every box is filled, then check the code.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not shake on every keystroke.',
          'Do not mix letters into a numeric code.',
          'Do not leave the row disabled without a reason next to it.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"The row is a group named Verification code. Each box is Digit 1 through Digit n."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The first box uses autocomplete one-time-code so the OS can offer a suggestion."}</li>
          <li>{"inputMode is numeric. Only digits are accepted."}</li>
          <li>{"Arrow keys move between boxes. Backspace clears the current digit, then the previous."}</li>
          <li>{"Paste a full code into any box. It fills from the start."}</li>
          <li>{"invalid or error sets aria-invalid on the group and on every box. Repeat the error in nearby copy."}</li>
          <li>{"Each box is at least 44px tall."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move into or out of the row" },
          { id: '1', keys: ["0-9"], action: "Enter a digit and advance" },
          { id: '2', keys: ["Backspace"], action: "Clear this digit, or the previous if empty" },
          { id: '3', keys: ["ArrowLeft", "ArrowRight"], action: "Move between boxes" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const qrGuide = {
  usage: (
    <DocsUsage>
        <Body>
          QR Code renders a scannable image from raw text or structured content — URLs, TOTP setup, Wi‑Fi,
          email, phone, SMS, geo, and plain text. The matrix stays on a white pad with the brand logo centered
          by default. Outline is the default frame in auth. Branded adds a primary-tinted frame for setup flows.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Content or value" description="Pass content with a kind, or value with a pre-encoded string. Use encodeQrContent helpers for each kind." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Brand logo" description={'logo defaults to brand. Set logo={false} for plain codes. High error correction keeps scans reliable with the center mark.'} />
        <Card variant="subtle" size="sm" eyebrow="03" title="States" description="Use loading while fetching data. Use error when generation fails. Use expired for time-limited codes such as device pairing." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use content={{ kind: "totp", secret }} during authenticator setup.',
          'Use content={{ kind: "url", href }} for marketing or app-download codes.',
          'Pair TOTP codes with Totp Manual Key so people can type the secret if scanning fails.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put the QR on a dark or tinted background without the white pad.',
          'Do not pass only the raw secret for authenticator setup — use kind totp or a TOTP URI.',
          'Do not resize the image with CSS in a way that blurs the modules.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"The QR is decorative for sighted users who scan with a phone. Always offer an equivalent text path for people who cannot scan."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Use alt text that names what the code is for, such as Authenticator QR code or Download app."}</li>
        <li>{"Loading sets aria-busy on the placeholder."}</li>
        <li>{"Error replaces the image with text so screen reader users know generation failed."}</li>
        <li>{"disabled sets aria-disabled on the wrapper."}</li>
        <li>{"Do not rely on the QR alone — manual entry or a link must stay available."}</li>
      </ul>
    </Alert>
  ),
}

export const recoveryGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Recovery Input is a backup code or account recovery key. Letters and numbers, grouped in fours, always
          uppercase. Field is a single formatted line. Groups is the same code in boxes. Outline is the default
          in auth. Mark invalid and shake only after a failed check.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Grouped" description="Hyphens are inserted for you. Eight characters is a backup code. Twenty-eight is an Apple-style recovery key." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Field or groups" description="Field is one line. Groups is one box per four characters, with paste filling the row." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Error after check" description="Invalid and shake run when the server rejects the code, not while the user is still typing." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use length 8 for one-time backup codes. Use 28 for a full recovery key.',
          'Use outline on a sign-in page. Use underline when the layout is already quiet.',
          'Show Recovery Codes List when the user must save codes. Offer copy on that list.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not ask the user to type the hyphens.',
          'Do not shake on every keystroke.',
          'Do not show recovery codes without a way to copy or download them.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Field mode is a single labeled text input. Groups is a group of boxes named Recovery code."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Only letters and numbers are accepted. They are uppercased as the user types."}</li>
          <li>{"Paste a full code into the field or into any group. It formats and fills from the start."}</li>
          <li>{"In groups, arrow keys move between boxes. Backspace clears, then steps back."}</li>
          <li>{"invalid or error sets aria-invalid. Repeat the error in a Field Hint."}</li>
          <li>{"Each field or box is at least 44px tall."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move into or out of the field" },
          { id: '1', keys: ["A-Z", "0-9"], action: "Enter a character. Groups advance when a box is full" },
          { id: '2', keys: ["Backspace"], action: "Delete the previous character, skipping hyphens" },
          { id: '3', keys: ["ArrowLeft", "ArrowRight"], action: "Move the caret, or between groups" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const datePickerGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Date Picker is a Select whose menu is a calendar. Outline is the default in forms. Subtle sits on a card.
          Ghost is for a dense toolbar. Underline is the quietest. Pill matches a rounded field. Range mode picks a
          start and an end, then Done commits.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Same field" description="Chrome, size, invalid, and valid match Select and Text Field. Do not invent a second date field." />
        <Card variant="subtle" size="sm" eyebrow="02" title="ISO in, words out" description="value is YYYY-MM-DD. The trigger shows a short readable date." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One calendar" description="Month and year open inside the same menu. Do not nest a second Select over the grid." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use single mode for a birthday, due date, or one-day filter.',
          'Use range mode for a report window. Done writes both dates.',
          'Mark invalid after submit and repeat the error in a Field Hint.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a native date input next to this field.',
          'Do not leave the trigger unlabeled. Pass label or aria-label.',
          'Do not lock dates with disabled unless nearby copy says why.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"The trigger is a button that opens a dialog. The calendar is a grid. Escape and a press outside close it."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The trigger has aria-haspopup=\"dialog\" and aria-expanded."}</li>
          <li>{"Each day is a gridcell named with the full weekday, month, day, and year."}</li>
          <li>{"Selected days set aria-selected. Disabled days are not operable."}</li>
          <li>{"Month and year labels switch the view. Previous and next move by month, year, or decade."}</li>
          <li>{"invalid sets aria-invalid on the trigger. Repeat the error in nearby copy."}</li>
          <li>{"The trigger is at least 44px tall at the default size."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Enter", "Space"], action: "Open or close the calendar" },
          { id: '1', keys: ["Escape"], action: "Close the calendar" },
          { id: '2', keys: ["Tab"], action: "Move through days, month, year, and actions" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const dividerGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Divider is a hairline between sections. Solid is the default, the same quiet rule Apple uses in Settings and
          on sign-in. Subtle is quieter inside a card. Dashed and dotted mark a softer break. Fade dissolves at the
          edges. Pass children for a centered label such as “or continue with.”
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Separate, don’t decorate" description="A divider marks a change of topic or a choice between two paths. If spacing already does that work, omit it." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Hairline first" description="Solid and subtle are 1px. Large is 2px for a major section, not a second accent." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Name the choice" description="A label is for a fork, such as password or a provider. A plain rule is for a list or a page break." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use a labeled divider on sign-in between the form and social buttons.',
          'Use inset on a grouped list so the rule lines up with the row title.',
          'Use vertical in a toolbar between peer actions. Keep it flush so it sits on the type.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not stack dividers as a substitute for spacing. Use the spacing scale.',
          'Do not paint a divider in a second accent. Brand is only for a branded break, such as a selected section.',
          'Do not put essential instructions only in the label. The layout must still read without it.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"An unlabeled divider is decorative. A labeled divider is a separator with an accessible name."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Unlabeled rules are aria-hidden so they do not appear in the accessibility tree."}</li>
        <li>{"A label or icon sets role=\"separator\" and aria-orientation. String children become aria-label."}</li>
        <li>{"Pass decorative when a labeled rule should stay silent, such as a repeated visual in a gallery."}</li>
        <li>{"Disabled is visual only. The divider is never a tab stop."}</li>
        <li>{"Do not rely on tone color alone. The words in the label carry the meaning."}</li>
      </ul>
    </Alert>
  ),
}

export const stackGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Stack lines items up in a column or a row with even space between them. Ghost is layout only. Fill, subtle,
          outline, and pill paint a surface around the group. Small, medium, and large set the inner padding when the
          stack is painted. Keep one job in the stack: a set of cards, a set of actions, or a set of fields.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Space, then chrome" description="Ghost is the default. Paint a surface only when the group needs to read as one object." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Closed scale" description="Small, medium, large, extra large, and 2X large are 12, 16, 24, 32, and 40 pixels. Do not invent a gap." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One direction" description="Vertical is a page or a form. Horizontal is a toolbar. Wrap a horizontal stack when the row can break." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use a vertical stack for a form or a set of cards. Use a horizontal stack for peer actions.',
          'Pass align stretch so neighbors share a width in a column. Pass start when each item should hug its copy.',
          'Use selected on a painted stack in a set of choices. Loading holds the layout until the items arrive.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Stack for a two dimensional gallery. That is Card Grid.',
          'Do not nest a button inside a pressable stack. The stack is already the control.',
          'Do not mix unrelated jobs in one stack, such as a metric and a form.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Stack is a layout. It does not change the names of the items inside it. A pressable stack is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Keep footer actions inside items, not on a pressable stack, so the control has a single job."}</li>
        <li>{"Order in the DOM is the reading order. Put the primary item first."}</li>
      </ul>
    </Alert>
  ),
}

export const usageGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Usage is the how-to block: a short paragraph, three principles, then do and don’t. Ghost is layout only. Fill,
          subtle, outline, and pill paint a surface around the group. The default gap is 24px. Keep one job in the
          block — how to use this, not a form or a gallery.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One column" description="Each principle and each do or don’t card sits on its own row at full width, so the line can run." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Closed gap" description="Small, medium, large, extra large, and 2X large are 12, 16, 24, 32, and 40 pixels. Large is the default." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One job" description="A usage block explains the thing on the page. Do not mix a metric or a form into it." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Start with one short paragraph. Follow with three principles. Close with do and don’t.',
          'Keep each card on its own row at full width so the copy can run without wrapping into a tight column.',
          'Paint a surface when the group should read as one help panel. Ghost is enough on a page.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put a live demo inside Usage. That is the demo panel.',
          'Do not skip principles to jump to do and don’t.',
          'Do not nest a button inside a pressable usage block. The block is already the control.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Usage is a layout. It does not change the names of the items inside it. A pressable usage block is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Principle numbers are visual. The title is the name of the principle."}</li>
        <li>{"Do and Don’t are in the heading text. Color is extra. Lists are real ul elements."}</li>
        <li>{"Order in the DOM is the reading order: heading, Body, principles, do, don’t, then children."}</li>
      </ul>
    </Alert>
  ),
}

export const tokenGroupGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Token Group labels a family of samples: a color set, a spacing scale, or a radius set. The title is an h3. The
          note is one supporting sentence. Ghost is layout only. Fill, subtle, outline, and pill paint a surface around
          the group. Keep one family in the group.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Family name" description="The title is Brand, Text, or Content width — not a sentence." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Note then samples" description="A short note, then the chips, bars, or radius cards." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One family" description="Do not mix text tokens and background tokens in one group." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use a title for every family when several groups sit in a row.',
          'Keep the note to one sentence. Pass columns so sibling samples share a grid.',
          'Paint a surface when the family should read as one panel. Ghost is enough on a page.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Token Group as a page heading.',
          'Do not put interactive controls inside a pressable group. The group is already the control.',
          'Do not mix two families in one group to save space.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Token Group is a labeled set of samples. The title is in the document outline. A pressable group is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The title renders as an h3. Keep the page outline honest."}</li>
        <li>{"The note is supporting copy, not a heading."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Each sample should still name itself. Do not hide the token name."}</li>
      </ul>
    </Alert>
  ),
}

export const stateCardGuide = {
  usage: (
    <DocsUsage>
        <Body>
          State Card is a sample of one control state. The caption is the state name. Subtle is the default quiet
          surface. Fill, outline, ghost, and pill change the chrome. Pass inert when the control is only a preview.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One state" description="Default, hover, disabled, or loading. Not a playground." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Quiet chrome" description="Subtle fill is the rest surface. Brand tone is for on-brand samples, not a second CTA." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Inert previews" description="Pass inert when pointer events on the sample would confuse the page." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use stretch for fields so the input can fill 320px. Pass wide when the field should fill the tile.',
          'Use large for taller samples such as a textarea.',
          'Pass inert on a button preview that does not do anything.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put two controls in one tile.',
          'Do not use State Card as a settings row. That is Settings Row.',
          'Do not nest a button inside a pressable State Card. The card is already the control.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"State Card is a labeled sample. The caption is visible text, not the accessible name of the control inside. A pressable card is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The caption names the state. It does not name the sample control."}</li>
        <li>{"Inert tiles block pointer events on the sample. They are not in the tab order for the sample."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Do not put the only instructions inside an inert tile."}</li>
      </ul>
    </Alert>
  ),
}

export const stateGridGuide = {
  usage: (
    <DocsUsage>
        <Body>
          State Grid lays out a set of State Cards. Three columns for fields. Six for compact controls, wrapping so
          each tile stays at least 12rem. Ghost is layout only. Fill, subtle, outline, and pill paint a surface around
          the set. Medium gap is 16px.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Count first" description="Pick columns from how many states belong together, not from the size of the window." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Cards only" description="Every cell is a State Card. Do not mix a field sample and a button sample in the same grid." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Match the row" description="Stretch is the default so a short tile matches its neighbors. Start lets each tile hug its sample." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use three columns for field states. Use six for a compact button row.',
          'Keep labels short and unique in the grid.',
          'Paint a surface when the set should read as one panel. Ghost is enough on a page.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put Body in this grid.',
          'Do not nest a button inside a pressable grid. The grid is already the control.',
          'Do not use State Grid for a gallery of destinations. That is Card Grid.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"State Grid is layout. Reading order is the order of the tiles in the markup. A pressable grid is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Each tile’s caption is the name of that state. Keep those names unique in the grid."}</li>
        <li>{"Inert previews must not be the only way to learn a state. Props and copy still describe it."}</li>
        <li>{"Put the primary state first. Screen readers follow that order on every breakpoint."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Collapsed columns on a small screen must not hide a tile. Every tile stays in the flow."}</li>
      </ul>
    </Alert>
  ),
}

export const stateGroupGuide = {
  usage: (
    <DocsUsage>
        <Body>
          State Group labels a set of states. Appearance, Size, Tone, and State are the usual titles. The title is a
          caption, not a heading. Ghost is layout only. Fill, subtle, outline, and pill paint a surface around the group.
          Pass columns to lay State Cards in a State Grid.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Caption first" description="The title is secondary, medium, and sits above the grid." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One axis" description="Do not mix size and tone in the same group." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Stack groups" description="Several groups sit in a Stack at a 40px gap." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use Appearance, Size, Tone, and State as titles.',
          'Pass columns so State Cards share a grid. Omit columns when the child is already a State Grid.',
          'Keep one axis per group.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use State Group as a page heading.',
          'Do not hide the title when several groups sit in a row.',
          'Do not nest groups, and do not nest a button inside a pressable group.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"State Group is a labeled set of samples. The title is a caption, not a heading. A pressable group is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The group title is a caption. The States heading on the page owns the outline."}</li>
        <li>{"If the group must be a landmark, pass a real heading instead of this component."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Each tile still names its state. Keep those names unique in the group."}</li>
      </ul>
    </Alert>
  ),
}

export const swatchGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Swatch renders a token as a fill and prints the CSS variable name in mono. Pass the token without the leading
          dashes. Outline is the default chip. Ghost is layout only. Fill, subtle, and pill paint chrome around the
          sample. The fill always comes from the token, not from tone.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Token not hex" description="The fill comes from the CSS variable so both themes stay correct." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Name on the chip" description="The caption is the token, not a marketing name." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Grid it" description="Prefer Swatch Grid for a family of four or more." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Pass brand-primary, not --brand-primary.',
          'Keep the token list in palette order: rest, hover, active, disabled, subtle.',
          'Use Swatch Grid for four or more chips.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not hardcode a hex on the chip.',
          'Do not use Swatch as a color picker.',
          'Do not mix a light-mode hex and a dark-mode hex in a note beside it.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Swatch is a labeled color sample. The token name is visible text. A pressable swatch is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The token name is visible text. If you describe the color in words, keep those words next to the chip."}</li>
        <li>{"Color is never the only signal in the surrounding copy."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Do not hide the token name unless a nearby label already names the sample."}</li>
      </ul>
    </Alert>
  ),
}

export const swatchGridGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Swatch Grid maps a list of token names to Swatch. Four columns is the default. Ghost is layout only. Fill,
          subtle, outline, and pill paint a surface around the family. Medium gap is 16px. Use it inside Token Group.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Family order" description="Follow the palette: rest, hover, active, disabled, subtle." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Names in data" description="The tokens array is the source of truth. Pass names without the leading dashes." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Four columns" description="Two on small screens. Six is compact and wraps so each chip stays at least 12rem." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Group by Brand, Text, Background, and Border.',
          'Keep hover and active next to rest.',
          'Put the grid inside Token Group.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not shuffle tokens for a prettier row.',
          'Do not pass hex values.',
          'Do not mix text and background in one grid.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Swatch Grid is a labeled set of color samples. Reading order is the order of the tokens in the array. A pressable grid is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Each chip already shows its token name. Do not hide that name unless a nearby label already names the sample."}</li>
        <li>{"A family still needs a Token Group title in the outline."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Do not nest a button inside a pressable grid. The grid is already the control."}</li>
      </ul>
    </Alert>
  ),
}

export const contrastCardGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Contrast Card paints a background token and sets type to a foreground token. The sample is 19px, the same as
          Body. Ghost is layout only. Fill, subtle, outline, and pill paint chrome around the pair. The pair always
          comes from the tokens, not from tone. Toggle the page theme to confirm the pair still holds.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Approved pairs" description="Only show combinations that meet the reading floor." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Body size" description="The sample is 19px, the same as Body." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Theme check" description="The tokens swap in dark mode. Do not lighten type by hand." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use text-primary on bg-primary for headlines.',
          'Use text-on-brand on brand-primary for filled buttons.',
          'Keep the label as a short use case.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not show a failing pair as a recommendation.',
          'Do not set color with a hex.',
          'Do not use this as a hero.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Contrast Card is a labeled reading pair. The sample sentence must stay readable in both themes. A pressable card is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The sample sentence must stay readable in both themes."}</li>
        <li>{"The label names the pair. It is not a heading."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Do not hide the label unless a nearby caption already names the pair."}</li>
      </ul>
    </Alert>
  ),
}

export const radiusCardGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Radius Card shows 8, 12, 18, or 980 as a sample block. The label is Control, Card, Panel, or Pill. Subtle is
          the default surface. Ghost is layout only. Fill, outline, and pill paint chrome around the sample. The sample
          uses the pixel value, including 980 for a pill.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Four values" description="Nothing else is on the scale." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Name the job" description="Control, Card, Panel, Pill — not Small or Large." />
        <Card variant="subtle" size="sm" eyebrow="03" title="True radius" description="The sample uses the pixel value, including 980 for a pill." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use 8 for fields.',
          'Use 18 for large surfaces.',
          'Use 980 for buttons and switches.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not show 4 or 16.',
          'Do not round only one corner in the sample.',
          'Do not mix a pill sample with an 8px sibling in one card.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Radius Card is a labeled corner sample. Radius is visual only. A pressable card is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Radius is visual only. Hit area stays 44px."}</li>
        <li>{"The pixel value is in mono so it is not mistaken for a heading."}</li>
        <li>{"The label names the job. It is not a heading."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
      </ul>
    </Alert>
  ),
}

export const scaleRowGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Scale Row draws a bar for a width. Pass bar and max for a percent of 1024, such as a content column. Pass
          width for a spacing step at its true pixel size. Ghost is layout only. Fill, subtle, outline, and pill paint
          chrome around the row.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Relative or true" description="bar and max make a percent. width makes a pixel bar. Do not mix them on one row." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Caption under" description="The use case sits under the bar." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Mono value" description="The leading number is the token, not a percent." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use 1024 as max for layout widths.',
          'Use width for the spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.',
          'Keep captions to a few words, and stack rows at a 12px gap.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not mix a percent bar and a pixel bar in the same stack.',
          'Do not animate the bar.',
          'Do not omit the caption.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Scale Row is a labeled width sample. The bar is decorative. A pressable row is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The value is text, not an image of a number."}</li>
        <li>{"The bar is decorative. The caption states the use."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Do not hide the caption unless a nearby label already names the sample."}</li>
      </ul>
    </Alert>
  ),
}

export const relatedGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Related lays out sibling links as Related Card. Three columns is the default. Small gap is 12px. Ghost is
          layout only. Fill, subtle, outline, and pill paint a surface around the set. Use it at the end of a page for
          nearby components.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Siblings" description="Link to peers in the same section, not to random pages." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Title plus one line" description="Each card is a name and a single sentence. Do not omit the description." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Three" description="Up to three on a kit page. Two on small screens. Six is compact and wraps so each card stays at least 12rem." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Pass items as href, title, and description.',
          'Keep descriptions to one sentence.',
          'Put Related below Accessibility, above the pager.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use this for marketing tiles.',
          'Do not nest a button inside a pressable grid. The grid is already the control.',
          'Do not omit the description.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Related is a set of sibling links. Reading order is the order of the items. A pressable grid is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Each card is a link with a visible title. Do not add a redundant aria-label."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"When the grid is pressable, inner cards are not links. The grid is the control."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Three cards collapse to one column on small screens."}</li>
      </ul>
    </Alert>
  ),
}

export const ruleCardGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Rule Card is one column of Do or Don’t. Subtle is the default surface. Ghost is layout only. Fill, outline,
          and pill paint chrome around the list. Success is Do. Danger is Don’t. Pair them in a Card Grid, or put
          both cards inside Usage.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Tone matches the title" description="Success with Do. Danger with Don’t. Do not swap them." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Complete lines" description="Each item is a full instruction, not a fragment." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Dots not icons" description="A small fill marks the list. The words carry the rule." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Put three items in each list.',
          'Start don’t items with Do not.',
          'Pair Do and Don’t in a Card Grid.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not mix do items into a don’t card.',
          'Do not use this for a changelog.',
          'Do not rebuild the list with divs.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Rule Card is a titled list of instructions. Color is extra. A pressable card is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Do and Don’t are in the title text, not only in color."}</li>
        <li>{"The list is a real ul. Screen readers hear a list, not a paragraph."}</li>
        <li>{"Ghost layout is a div. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Do not nest a button inside a pressable card. The card is already the control."}</li>
      </ul>
    </Alert>
  ),
}

export const inlineCodeGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Inline Code marks a token, prop, or import path inside Body. Keywords and CSS variables use brand primary.
          Strings use teal. Ghost is layout only and is the default, so it sits in a sentence. Fill, subtle, outline,
          and pill paint chrome around the sample. Use Snippet or Code Panel for a block.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Names only" description="as, --brand-primary, @/icons. Not a whole sentence." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Same size" description="13px mono at the default size, so it sits in Body." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Rare" description="One or two per paragraph. More belongs in a snippet." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use it for prop names such as as and label.',
          'Use it for import paths and token names.',
          'Keep the surrounding sentence readable without it.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use it for emphasis on ordinary words.',
          'Do not put a block of JSX here.',
          'Do not change the font size by hand.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Inline Code is a short code sample inside a sentence. Mono is the signal. A pressable sample is a single control."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Code in a sentence is still read as text. Say “the as prop” if the name alone is unclear."}</li>
        <li>{"Do not use color alone to mark a token. Mono is the signal. Highlighting is extra."}</li>
        <li>{"Ghost layout is a code element. href renders a link. onClick renders a button."}</li>
        <li>{"Disabled and loading are not operable. Loading sets aria-busy."}</li>
        <li>{"Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Do not nest a button inside a pressable sample. The sample is already the control."}</li>
      </ul>
    </Alert>
  ),
}

export const textFieldGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Text Field is a single line. Outline is the default in forms. Subtle sits on a card. Ghost is quiet in a
          dense list. Underline is the quieter layout. Pill is for search. Pair it with Field Label so the name stays
          on screen.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One line" description="If the user needs more than a sentence, use Textarea. If the value is a secret, use Password Field." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Named, then hinted" description="Field Label names the control. Field Hint carries help, success, and errors under the field." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Same chrome" description="Invalid and valid use the same danger and success rings as Select, Password Field, and OTP Boxes." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Pass a leading icon on auth and settings fields so the type of value is obvious at a glance.',
          'Use outline on a sign-in page. Use pill for search. Use underline when the layout is already quiet.',
          'Mark invalid after submit, and repeat the error in Field Hint.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use the placeholder as the only label.',
          'Do not rely on a red border alone. Set aria-invalid and put the words next to the field.',
          'Do not mix a custom height. Small, medium, and large already match Button and Select.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"A text field is a native input. Name it with a visible Field Label and htmlFor, or with aria-label when the words sit elsewhere."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Focus is a 2px brand ring. Invalid uses a danger ring and aria-invalid. Valid uses a success ring."}</li>
          <li>{"Medium is 44px tall. Small stays at least 36px. The label is extra height above the field."}</li>
          <li>{"Pass autocomplete that matches the value, such as email or username, so the browser and password manager can help."}</li>
          <li>{"Disabled is not operable. Explain why in nearby copy instead of a silent lock."}</li>
          <li>{"A leading icon is decorative. The accessible name is the label, not the glyph."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field" },
          { id: '1', keys: ["Enter"], action: "Submit the surrounding form" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const textareaGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Textarea is more than one line. Outline, subtle, ghost, and underline match Text Field. Well is a Notes-style
          pad. Composer adds a footer for a hint and a character count. Pair it with Field Label.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="More than a line" description="Use Text Field for a name, email, or search. Use Textarea for a note, bio, or message." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Count when it matters" description="Set maxLength when there is a real cap. Composer shows the count in the footer." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Well is a pad" description={'Well and composer do not resize. The rest can stretch vertically unless you pass resize="none".'} />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use outline in a form. Use well for an internal note. Use composer when the count or a short hint belongs in the field.',
          'Put the error in Field Hint, not only in the border.',
          'Keep the minimum height large enough to write two or three lines without stretching first.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a textarea for a single-line value.',
          'Do not show a count unless the limit is real.',
          'Do not put a primary action inside the field. Composer is for a hint and a count, not a Send button.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"A textarea is a native multi-line input. Name it with Field Label. The count is supporting text, not the name."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Focus is a 2px brand ring. Invalid uses a danger ring and aria-invalid."}</li>
          <li>{"The character count is visible text. It does not replace a label."}</li>
          <li>{"Resize, when allowed, is vertical only so the layout does not break sideways."}</li>
          <li>{"Disabled is not operable. Read-only still allows copy."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field" },
          { id: '1', keys: ["Enter"], action: "Insert a new line" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const passwordFieldGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Password Field is Text Field with a lock and a reveal. The value is masked until the user shows it. Outline
          matches the rest of auth. The reveal can be an icon, Show/Hide text, or a pill.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Masked by default" description="The field starts hidden. Reveal is a choice, not the default." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Same chrome as Text Field" description="Outline, subtle, ghost, underline, and pill. Invalid and valid use the same rings." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Reveal is an accessory" description="It lives inside the field. It is not a second Button beside it." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use autocomplete current-password on sign-in and new-password on create account.',
          'Keep the lock unless the surrounding layout already makes the field obvious.',
          'Mark invalid after a failed sign-in, and repeat the error under the field.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not show the password by default.',
          'Do not use Text Field with type="password" and a custom toggle. That is this component.',
          'Do not put the reveal outside the field as a separate ghost button.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"The field is a native password input. The reveal is a separate button named Show password or Hide password."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The reveal has aria-pressed for the shown state and an aria-label that flips with visibility."}</li>
          <li>{"Mouse down on the reveal is prevented so the field keeps focus while the value is shown."}</li>
          <li>{"Focus on the field is a 2px brand ring. Invalid uses a danger ring and aria-invalid."}</li>
          <li>{"Pass autocomplete current-password or new-password so the password manager can fill the field."}</li>
          <li>{"spellCheck and autocapitalize are off. The value is not a sentence."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field, then the reveal" },
          { id: '1', keys: ["Enter", "Space"], action: "On the reveal, show or hide the password" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const passwordRevealGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Password Reveal shows or hides a password. Ghost is the default inside a field. Text is Apple-style
          Show/Hide. Pill is a labeled chip. Use it on Password Field, or stand it alone with inField set to false.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Inside the field" description="inField is the default. The control sits on the trailing edge of Text Field." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Name the action" description="Icon-only still says Show password. Text and pill show Show or Hide." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Match the size" description="Small, medium, and large follow the field they sit in." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Prefer Password Field, which already includes a reveal.',
          'Use text or pill when the control must be understood without an icon.',
          'Keep the same size as the field.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use it to reveal anything except a password or similar secret.',
          'Do not place two reveals on one field.',
          'Do not leave it unlabeled. Icon-only still needs aria-label.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"The reveal is a button. It does not submit the form. The name is Show password or Hide password."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"type=\"button\" so Enter in the field still submits the form, not the reveal."}</li>
          <li>{"aria-pressed is true while the password is shown."}</li>
          <li>{"onMouseDown is prevented so focusing the reveal does not blur the field."}</li>
          <li>{"Disabled follows the field. A disabled field does not reveal."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the reveal" },
          { id: '1', keys: ["Enter", "Space"], action: "Show or hide" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const selectGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Select picks one value from a list. Outline, subtle, ghost, underline, and pill match Text Field. Options can
          carry an icon, a description, and a short meta line. Search filters a long list. The popup is the same width
          as the field.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One value" description="If several can be on, use Checkbox. If the set is two to five and always visible, use Radio or Segmented Control." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Search when the list is long" description="Countries, languages, and plans with many options pass searchable." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Width matches the field" description="The menu is not a floating card of a different size. matchWidth is the default." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Pass a Field Label or aria-label. Placeholder is not the name.',
          'Use option icons when every row has a unique glyph, such as a flag or a plan mark.',
          'Mark invalid after submit, the same way as Text Field.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use it for a binary on or off. That is Switch.',
          'Do not leave a required select on the placeholder. Select a sensible default when you can.',
          'Do not build a custom menu for countries, states, or languages. Those already wrap this Select.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"The field is a button that opens a listbox. The selected option is the accessible value."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The trigger has aria-haspopup=\"listbox\", aria-expanded, and aria-controls pointing at the menu."}</li>
          <li>{"Each row is role=\"option\" with aria-selected on the current value. Disabled options are skipped."}</li>
          <li>{"Pass label or aria-label. The visible value is not enough when the field is empty."}</li>
          <li>{"Search, when present, is a search input at the top of the menu. Type to filter, then choose an option."}</li>
          <li>{"Focus on the field is a 2px brand ring. Invalid uses a danger ring and aria-invalid."}</li>
          <li>{"The hit target is at least 44px tall at medium size."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field, or move into search and options when open" },
          { id: '1', keys: ["Enter", "Space"], action: "Open the menu, or choose the focused option" },
          { id: '2', keys: ["Escape"], action: "Close the menu" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const countrySelectGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Country Select is a searchable Select of countries, with flags on the field and in the menu. Pass the ISO
          code to State Select, City Select, and Phone Input so the rest of the address follows the country.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="ISO in, name out" description="value is a two-letter code such as US or PK. The menu shows the country name and the flag." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Search the list" description="Type a name, code, or dialing code. The list is long on purpose." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Clear the cascade" description="When the country changes, clear state, county, and city in the same handler." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use this instead of a plain Select of country names.',
          'Pass enabledIsos when only some countries can be chosen. The rest stay visible as Coming soon.',
          'Set allowClear false when a country is required.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not store the display name. Store the ISO code.',
          'Do not filter the menu by hiding rows without a disabled state. Keep unavailable countries in the list.',
          'Do not skip this field and type a country into Text Field.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"This is a Select. The accessible name defaults to Country. Each option is a country name with a flag that is decorative."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The trigger uses aria-haspopup=\"listbox\". Search is a search field at the top of the menu."}</li>
          <li>{"Flags are images with the country name already in the option text. They do not need a second name."}</li>
          <li>{"Clear, when allowed, is an option labeled Not set that stores null."}</li>
          <li>{"Keyboard matches Select. Type in search to filter, then choose a row."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field, or move into search and options when open" },
          { id: '1', keys: ["Enter", "Space"], action: "Open the menu, or choose the focused option" },
          { id: '2', keys: ["Escape"], action: "Close the menu" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const stateSelectGuide = {
  usage: (
    <DocsUsage>
        <Body>
          State Select is a searchable Select of regions. Pass a country to filter. The label follows the country:
          State in the US, Province in Pakistan and Canada, Emirate in the UAE.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Country first" description="Pass country so the list is that country’s regions. Without it, the catalog is mixed." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Code in, name out" description="value is ISO 3166-2, such as US-CA or PK-SD." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Clear the next field" description="When the region changes, clear county and city in the same handler." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Put Country Select above this field, and pass its value as country.',
          'Use the default label so it reads State, Province, or Emirate for that country.',
          'Pass items when your directory is larger than the starter catalog.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not ask for a state in a country that has none. Hide the field instead.',
          'Do not keep a previous region after the country changes.',
          'Do not type a region into Text Field.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"This is a Select. The accessible name is the regional noun for that country, such as State or Province."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Keyboard, search, and aria-haspopup match Select."}</li>
          <li>{"Empty search copy names the noun, such as No provinces for this country."}</li>
          <li>{"Disabled when the country has not been chosen yet is clearer than an empty list. Explain it in Field Hint if you lock the field."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field, or move into search and options when open" },
          { id: '1', keys: ["Enter", "Space"], action: "Open the menu, or choose the focused option" },
          { id: '2', keys: ["Escape"], action: "Close the menu" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const countySelectGuide = {
  usage: (
    <DocsUsage>
        <Body>
          County Select is a searchable Select of counties or districts. Pass a state to filter. Skip the field in
          countries that do not use this layer.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="State first" description="Pass state so the list is that region’s counties." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Optional layer" description="Not every country has counties. Hide the field when the catalog is empty." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Clear city" description="When the county changes, clear city in the same handler." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Show this field only when the selected state has counties in your catalog.',
          'Pass items for a full directory. The kit ships a starter set.',
          'Keep the label County, or District, to match the country.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not show an empty county field on every address form.',
          'Do not keep a previous county after the state changes.',
          'Do not require a county where the country does not use one.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"This is a Select. The accessible name defaults to County."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Keyboard, search, and aria-haspopup match Select."}</li>
          <li>{"If you hide the field, do not leave a required county in the form data."}</li>
          <li>{"Disabled until a state is chosen is fine. Say why in Field Hint."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field, or move into search and options when open" },
          { id: '1', keys: ["Enter", "Space"], action: "Open the menu, or choose the focused option" },
          { id: '2', keys: ["Escape"], action: "Close the menu" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const citySelectGuide = {
  usage: (
    <DocsUsage>
        <Body>
          City Select is a searchable Select of cities. Pass a country, state, or county to narrow the list. County
          wins, then state, then country. The kit ships a starter catalog — pass items for a full directory.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Narrow from above" description="Pass county, state, or country. The tightest filter wins." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Starter catalog" description="The bundled list is for demos. Pass items when the product needs every city." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Clear on cascade" description="When country, state, or county changes, clear this value in that handler." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Place it last in an address stack, after country, state, and county.',
          'Allow typing in search. City lists are long.',
          'Pass items from your own directory for production.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not list every city in the world without a country or state filter.',
          'Do not keep a previous city after the region changes.',
          'Do not use Text Field for a city when a known list exists.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"This is a Select. The accessible name defaults to City."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Keyboard, search, and aria-haspopup match Select."}</li>
          <li>{"Search is required in practice. Do not remove it on a long list."}</li>
          <li>{"Disabled until a country is chosen is fine. Say why in Field Hint."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field, or move into search and options when open" },
          { id: '1', keys: ["Enter", "Space"], action: "Open the menu, or choose the focused option" },
          { id: '2', keys: ["Escape"], action: "Close the menu" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const languageSelectGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Language Select is a searchable Select of languages. The value is a BCP 47 id such as en-US. Use it for
          display language, not for a spoken-language survey with several answers — that is Checkbox.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One language" description="The field stores one id. If the user can pick several, use a group of checkboxes." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Search native names" description="Type English or the native name. Keywords include both." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Coming soon" description="Pass enabledIds when only some locales ship. The rest stay in the list as unavailable." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Store the BCP 47 id, not the display name.',
          'Put this on account or appearance settings, not in the middle of an address form.',
          'Keep unavailable languages visible so the list stays stable as you ship more.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a plain Select of translated labels without ids.',
          'Do not hide languages that are not ready. Mark them disabled.',
          'Do not use this for spoken languages when several can be true. That is Checkbox.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"This is a Select. The accessible name defaults to Language."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Keyboard, search, and aria-haspopup match Select."}</li>
          <li>{"The option text is the language name. The id is meta, not the accessible name."}</li>
          <li>{"There is no clear row by default. A language stays selected."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field, or move into search and options when open" },
          { id: '1', keys: ["Enter", "Space"], action: "Open the menu, or choose the focused option" },
          { id: '2', keys: ["Escape"], action: "Close the menu" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const listRowGuide = {
  usage: (
    <DocsUsage>
        <Body>
          List Row is one cell in a grouped list. Put rows in a{' '}
          <DocsInlineCode>ListGroup</DocsInlineCode>. Fill is the default inset group, the same white
          card Settings uses on a gray page. Subtle tints the group. Outline holds an edge on a busy
          surface. Ghost is a plain list with hairline rules. Pill is a nested well with capsule
          rows.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Group first" description="A row never sits alone on the page. The group is the surface. The row is the cell." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One job" description="A row either drills in, toggles, or shows a value. Do not mix a switch and a chevron." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Inset rules" description="The hairline starts at the title, not under the leading mark. Last row has no rule." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill on a page. Use ghost inside an existing card. Use pill in a compact sheet.',
          'Pass chevron or href when the row opens another view. Pass a Switch as trailing when the row is a setting.',
          'Use danger tone for Delete and Sign out. Use brand tone for Add account and other constructive actions.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not nest a Button in a tappable row. Trailing actions belong on a static row.',
          'Do not paint a second accent on the selected row. Brand is the only tint.',
          'Do not use List Row for a labeled control with a long description. That is Settings Row.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"A List Group is a list. Each row is a list item. A tappable row is a button or a link. A static row is not in the tab order."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"href renders a link. onClick renders a button. A row with only trailing controls stays a static item."}</li>
          <li>{"selected sets aria-current. The checkmark is decorative. The title still names the row."}</li>
          <li>{"disabled dims the row and removes it from the click cycle. The title remains readable."}</li>
          <li>{"Do not rely on tone color. Danger rows still say Delete or Sign out in the title."}</li>
          <li>{"A Switch or Text Action in trailing is its own control. Do not also make that row a button."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move to a tappable row, or to a trailing control" },
          { id: '1', keys: ["Enter", "Space"], action: "Activate the focused row or control" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const settingsRowGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Settings Row is one cell in a preference list. Put rows in a{' '}
          <DocsInlineCode>SettingsList</DocsInlineCode>. Fill is the default inset group, the same
          white card Settings uses on a gray page. Subtle tints the group. Outline holds an edge on
          a busy surface. Ghost is a plain list with hairline rules. Pill is a nested well with
          capsule rows.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Group first" description="The list is the surface. The row is the cell. Header names the section. Footer explains it." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One job" description="A row either flips a switch, drills in, shows a value, picks from a set, or runs an action. Do not mix a switch and a chevron." />
        <Card variant="subtle" size="sm" eyebrow="03" title="The mark is the category" description="A colored well names the setting at a glance. Brand is the default. Teal is verified. Danger is destructive. Muted is system." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill on a settings page. Use ghost inside an existing card. Use pill in a compact sheet.',
          'Pass a Switch as control. Pass value plus onClick for Language and similar. Pass selected for a choice set.',
          'Use danger tone for Delete and Sign out. Use brand tone for Add account. Keep the title a short verb.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not nest a Button in a tappable row. The switch or the row is the control, not both as buttons.',
          'Do not put two settings in one row. Split them.',
          'Do not use Settings Row for a person in a list. That is List Row.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"A Settings List is a group. A tappable row is a button or a link. A row with a switch stays static so the switch keeps the keyboard."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"href renders a link. onClick without a nested control renders a button. A switch row stays a static item."}</li>
          <li>{"Selection rows set aria-pressed. The checkmark is decorative. The title still names the choice."}</li>
          <li>{"disabled and loading dim the row. Loading replaces the trailing control with a spinner and sets aria-busy."}</li>
          <li>{"Do not rely on tone or icon color. Danger rows still say Delete or Sign out in the title."}</li>
          <li>{"The icon well is hidden from assistive tech. The label is the name."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move to a tappable row, or to a switch" },
          { id: '1', keys: ["Enter", "Space"], action: "Activate the focused row or flip the switch" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const phoneInputGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Phone Input is a country code plus a national number. The code is a Select with flags. The number formats
          as the user types. The value you store is E.164, such as +14155552671.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="E.164 out" description="onChange emits + and digits. The national field is display only." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Code is a Select" description="The popup matches the full field width, the same as other Selects on the page." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Format as they type" description="Hyphens and spaces are inserted for the selected country. Backspace skips them." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use this instead of a single Text Field for a phone number.',
          'Keep the country Select and the number on one row.',
          'Validate length after the user leaves the field, not on every keystroke.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not store the formatted national number. Store E.164.',
          'Do not add a second country field next to this one.',
          'Do not strip the plus. Downstream SMS and auth APIs expect E.164.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Two controls share the row: a Country code listbox and a Phone number text field."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The Select is named Country code. The input is named with the label, default Phone number."}</li>
          <li>{"The number uses inputMode tel and autocomplete tel-national."}</li>
          <li>{"Backspace over a hyphen or space deletes the previous digit, not only the punctuation."}</li>
          <li>{"Disabled dims both the Select and the number."}</li>
          <li>{"Each control is at least 44px tall."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move from country code to the number, or out of the field" },
          { id: '1', keys: ["Enter", "Space"], action: "On the country control, open the menu" },
          { id: '2', keys: ["Escape"], action: "Close the country menu" },
          { id: '3', keys: ["Backspace"], action: "Delete the previous digit, skipping formatting" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const alertGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Alert is an inline status message. Subtle is the default on a page. Outline sits on a card. Ghost is for a
          dense list. Solid is for a moment that must not be missed. Tone is the meaning: info, success, warning,
          danger, or a quiet neutral note.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One idea" description="A short title states the fact. The body is one supporting line, not a paragraph." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Tone is the meaning" description="Info is a status. Success confirms a save. Warning needs attention. Danger is a failure. Neutral has no semantic color." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Dismiss is optional" description="Use onDismiss when the user can safely hide the note. Keep blocking errors on the page until they are fixed." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use subtle in a form or dashboard. Use outline when the alert sits on a tinted card.',
          'Put a single action under the body, such as Try again or View invoice.',
          'Mark danger and warning so assistive tech hears them as alerts, not status.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not stack three alerts. Fix the first, then show the next.',
          'Do not use solid for a routine save. That is Success in subtle.',
          'Do not put a second accent color on the action. Use the same tone as the alert.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Info, success, and neutral use role status. Warning and danger use role alert so a screen reader announces them immediately."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The title is the name of the message. The body is supporting copy, not a second heading."}</li>
          <li>{"Dismiss is an icon button named Dismiss. It is at least 32px."}</li>
          <li>{"The action, if present, is a Button. Keep its label a short verb."}</li>
          <li>{"Do not rely on icon color alone. The title restates the meaning."}</li>
          <li>{"Hide the icon only when the nearby heading already carries the same meaning."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move to the action or Dismiss" },
          { id: '1', keys: ["Enter", "Space"], action: "Activate the action or dismiss the alert" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const emptyStateGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Empty State is the view when a list, search, or canvas has nothing to show. Fill is the default, the same
          quiet page Apple uses for Mail and Files. Subtle, outline, and pill sit inside a card. Ghost is type and a
          glyph with no chrome.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One reason" description="The title names what is missing. The body is one line that says what happens next." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One action" description="A single primary button is enough. A secondary action is a quieter way out, not a second CTA." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Deference" description="The glyph stays tertiary gray unless the empty is a failure. Then use danger." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill on a page. Use subtle or outline when the empty sits in a card or table slot. Use Empty Popup inside a menu or palette.',
          'Use small in a table or sidebar. Use large only when the empty is the whole view.',
          'Name the action as a verb the person can do now, such as New project or Try again.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not illustrate every empty with a custom drawing. A kit icon is enough.',
          'Do not stack three sentences. If you need a longer story, that is a page, not an empty state.',
          'Do not use success green for All caught up. That is still a calm default empty.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Empty State is a region named by its title. It is not a live status. The action, if present, is a Button."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The title is a heading. Assistive tech can move to it when the view has no rows."}</li>
          <li>{"The body is supporting copy, not a second heading."}</li>
          <li>{"If there is no icon, the title still names the view."}</li>
          <li>{"Disabled on the action is the button, not the region."}</li>
          <li>{"Do not rely on icon color. The title restates a failure, such as Could not load."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move to the action" },
          { id: '1', keys: ["Enter", "Space"], action: "Activate the action" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const loaderGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Loader is the activity indicator. Fill is the default, the same quiet spinning ring Apple uses on a
          page. Subtle, outline, and pill sit in a circular well. Ghost is a fainter ring. Use this for an inline
          wait. Use Loading Screen when the whole view is not ready.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Unknown amount" description="The ring travels because you do not know how far along the work is. If you do, use Progress." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One accent" description="Brand is the default tick. Default is the gray Apple ring. Success, warning, and danger are for a wait that already has meaning." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Name it" description="A short label is the accessible name. If there is no label, the name is Loading." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill next to a line of copy or in a toolbar. Use pill or subtle when the wait sits on a card.',
          'Use small in a button row or a table. Use large only when the loader is the focus of the view.',
          'Keep the label one calm word or a short phrase, such as Saving or Loading messages.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Loader for a branded boot. That is Loading Screen.',
          'Do not stack three loaders. One wait per view.',
          'Do not leave a loader after the work is done. Replace it with the content, or with Empty State if nothing arrived.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Loader is a status. It is busy until you replace it. It is not operable."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"role=\"status\" with aria-busy and aria-live polite. The label is the accessible name."}</li>
        <li>{"If there is no label, the name is Loading."}</li>
        <li>{"decorative hides the loader from assistive tech. Use that only when a parent already names the wait, such as Loading Screen."}</li>
        <li>{"The ring is hidden from assistive tech. The text carries the meaning."}</li>
        <li>{"prefers-reduced-motion stops the spin. The ring stays as a static arc."}</li>
      </ul>
    </Alert>
  ),
}

export const loadingScreenGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Loading Screen holds the view while work finishes. Fill is the default, the same branded wait Apple uses
          at boot and sign in. Subtle, outline, and pill sit inside a panel. Ghost is the mark and spinner with no
          chrome.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Unknown amount" description="This is a wait, not a percent. If you know how far along the work is, use Progress." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One line" description="The status is one calm sentence. After a real wait, swap to the delayed line." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Brand, then motion" description="The mark identifies the product. The spinner or bar is extra proof that work is still going." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill for a full page boot. Use subtle or outline when the wait is a card or a pane.',
          'Pass delayedStatus and a delay of several seconds. Do not show the delayed line on the first frame.',
          'Use the bar when the wait sits with other progress in the same view. Use the spinner for a branded boot.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not fake a percent. If the amount is unknown, keep the bar traveling or use the spinner.',
          'Do not put a retry button on this screen. When the wait fails, that is Empty State or Alert.',
          'Do not use Loading Screen for a list that is arriving. That is Skeleton.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Loading Screen is a status. It is busy until you replace it. It is not operable."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"role=\"status\" with aria-busy and aria-live polite. The status line is the accessible name."}</li>
        <li>{"When the delayed line replaces the first, the live region announces the new copy."}</li>
        <li>{"The mark is decorative. The status, or Loading if there is no status, is the name."}</li>
        <li>{"The spinner and bar are hidden from assistive tech. The text carries the meaning."}</li>
        <li>{"prefers-reduced-motion stops the spin and the traveling bar."}</li>
      </ul>
    </Alert>
  ),
}

export const progressGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Progress shows how far a task has gone. Fill is the default, the same quiet bar Apple uses for downloads
          and storage. Subtle, outline, ghost, and pill match the rest of the kit. Mark success when the work is
          done, danger when it failed.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Known amount" description="Pass a value from 0 to 100 when you know how far along the work is." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Unknown amount" description="Pass indeterminate while you wait. The bar travels. Do not fake a percent." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Name it" description="A label is the accessible name. The percent is extra, not the only signal." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill for uploads, installs, and quotas. Use pill when the bar should feel like a control, such as storage on a card.',
          'Switch tone to success at 100 percent, or danger after a failed transfer.',
          'Keep one bar per task. A list of files gets one bar each, not one bar for the whole set unless that is the story.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Progress for a value the person sets. That is Slider or Number Field.',
          'Do not animate the percent on every byte if it makes the label jump. Round, then update.',
          'Do not leave an indeterminate bar after you know the value. Swap to a determinate bar.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Progress is a progressbar. It is not operable. The label is the name. The percent is the value."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"role=\"progressbar\" with aria-valuemin 0, aria-valuemax 100, and aria-valuenow when the value is known."}</li>
        <li>{"indeterminate omits aria-valuenow, sets aria-busy, and uses aria-valuetext Loading."}</li>
        <li>{"If there is no visible label, the bar still has an accessible name."}</li>
        <li>{"Disabled is visual only. The bar is never a tab stop."}</li>
        <li>{"The traveling fill respects prefers-reduced-motion and stops."}</li>
      </ul>
    </Alert>
  ),
}

export const scoreRingGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Score Ring shows a score or how far a circular task has gone. Fill is the default, the same quiet ring
          Apple uses for downloads and Screen Time. Subtle tints the track. Outline, ghost, and pill match the rest
          of the kit. Mark success when the work is done, danger when it failed.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Known amount" description="Pass a score from 0 to 100 when you know the value. The arc fills from the top, clockwise." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Unknown amount" description="Pass indeterminate while you wait. The arc travels. Do not fake a percent." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Name it" description="A label is the accessible name. The percent in the center is extra, not the only signal." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill for a profile score, a quota, or a setup checklist. Use pill when the ring should feel like a control on a card.',
          'Switch tone to success at 100 percent, or danger after a failed check. Pass showCheck when a mark should replace the number.',
          'Keep one ring per metric. A set of scores is a row of rings, not concentric rings unless that is the story.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Score Ring for a value the person sets. That is Slider or Number Field.',
          'Do not use it as a page spinner. That is Loading Screen.',
          'Do not leave an indeterminate ring after you know the value. Swap to a determinate ring.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Score Ring is a progressbar. It is not operable. The label is the name. The percent is the value."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"role=\"progressbar\" with aria-valuemin 0, aria-valuemax 100, and aria-valuenow when the value is known."}</li>
        <li>{"indeterminate omits aria-valuenow, sets aria-busy, and uses aria-valuetext Loading."}</li>
        <li>{"If there is no visible label, the ring still has an accessible name."}</li>
        <li>{"Disabled is visual only. The ring is never a tab stop."}</li>
        <li>{"The traveling arc respects prefers-reduced-motion and stops."}</li>
      </ul>
    </Alert>
  ),
}

export const skeletonGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Wrap the real component in Skeleton. The child tree still mounts, so the bones keep its size, radius, and
          gaps. The stylesheet is compiled with the app. If that sheet is not in the document yet, the same CSS is
          inserted once at runtime. There is no layout measurement on load. Bones without children remain for a
          line, heading, circle, rect, or square.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Wrap the real tree" description="Pass the component that will appear. Placeholder props are enough. The layout is the skeleton." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Compiled CSS" description="Rules are built with the stylesheet. Runtime only toggles an attribute, or inserts the same sheet once if it was missing." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Quiet motion" description="Shimmer is the default. Pulse is an opacity breath. Static is for prefers-reduced-motion or a paused load." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Wrap the loaded view. Set loading false when the data is ready.',
          'Pass a label so assistive tech hears Loading.',
          'Keep one motion on a screen. Do not mix shimmer and pulse in the same view.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not measure the DOM to build a skeleton. The CSS already knows the boxes.',
          'Do not brand the fill with success or danger. A placeholder has no status.',
          'Do not wrap an empty tree. If the data is missing, still pass a shell with placeholder props.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"A wrapped tree is a status that stays busy. The children are hidden from assistive tech until loading is false."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Auto mode sets role status, aria-busy, and a label on the wrapper. Children are aria-hidden and inert."}</li>
        <li>{"Bone placeholders without children are aria-hidden. Pass label on a group for Loading profile."}</li>
        <li>{"Set loading false to restore the live tree to the accessibility map."}</li>
        <li>{"Shimmer and pulse stop when prefers-reduced-motion is set. Use motion none to match that by default."}</li>
      </ul>
    </Alert>
  ),
}

export const modalGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Modal is the overlay above the page. Dialog is a form or a longer task. Alert is a short decision, like
          iOS. Sheet rises from the bottom. Action is a list of choices with Cancel on its own row. One overlay at a
          time. The page behind it does not scroll.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One job" description="A title names the task. Description is one supporting line. Actions finish it." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Pick the chrome" description="Alert for two choices. Dialog for a field or a list. Sheet for a longer editor. Action for Share, Copy, Delete." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Dismiss is a choice" description="Backdrop and Escape close a casual dialog. Lock them while work is saving, or when the person must pick an action." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use alert for Delete, Log out, and Discard. Two actions, short labels.',
          'Put the primary action first in a dialog footer. Cancel is the quieter control under it.',
          'Pass icon when the tone is danger, success, or warning and the title does not already say that.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not nest a modal in a modal. Close the first, then open the next.',
          'Do not use a dialog when an inline Alert on the page is enough.',
          'Do not put a second accent color on actions. Primary is blue. Destructive is red. Nothing else.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Modal is a dialog. It takes focus, names itself from the title, and returns focus when it closes."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The overlay uses role dialog and aria-modal. The title is the accessible name."}</li>
          <li>{"Description, when present, is aria-describedby. Body copy is supporting content, not a second heading."}</li>
          <li>{"Focus moves into the panel when it opens and restores to the control that opened it."}</li>
          <li>{"Tab cycles inside the panel. Escape and the close button dismiss when dismissible is true."}</li>
          <li>{"Loading sets aria-busy and blocks dismiss. The busy action keeps a text name, such as Sending."}</li>
          <li>{"Do not rely on icon color. The title restates a destructive or successful action."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Esc"], action: "Close when dismissible" },
          { id: '1', keys: ["Tab"], action: "Move through controls in the panel" },
          { id: '2', keys: ["Shift", "Tab"], action: "Move backward" },
          { id: '3', keys: ["Enter", "Space"], action: "Activate the focused action" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const commandPaletteGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Command Palette is search that runs a command. Spotlight is a floating field, like macOS. Command is a
          panel with grouped results and keyboard hints. Nav is the site search that replaces the bar, like the
          marketing header. Sheet rises from the bottom on a phone. The trigger is Nav Search — outline in a toolbar,
          icon in a marketing header.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One field" description="The person types, arrows through results, and presses Return. Nothing else competes." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Match the chrome" description="Nav for a marketing header. Command for an app. Spotlight for a system-wide jump. Sheet on a small screen." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Stay quiet" description="Selected is a gray row, not a second accent. Cancel in nav is Anchor — brand blue. That is the only color besides the results." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Put bordered Nav Search in the bar with shortcut ⌘K. Command Search is that field used as the trigger.',
          'Show Quick Links when the nav field is empty. Filter as soon as the person types.',
          'Keep result labels short. Put the group or a shortcut on the trailing side.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not restyle the trigger. Outline is the default. Use pill, subtle, ghost, or icon when the bar needs them.',
          'Do not stack a second search inside the palette. The top field is the only input.',
          'Do not highlight a row in brand blue. Selected is the hover surface.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Command Palette is a dialog that holds a combobox. Focus stays in the field. Arrows change the active option."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The overlay uses role dialog. The search field is a combobox with aria-expanded, aria-controls, and aria-activedescendant."}</li>
          <li>{"Results use listbox and option. The active row is aria-selected."}</li>
          <li>{"Focus moves into the field when it opens and restores to the control that opened it."}</li>
          <li>{"Escape and the backdrop, or Cancel in nav, dismiss the overlay. Cancel is Anchor without an href, so it is a button."}</li>
          <li>{"Do not rely on the shortcut hint. The trigger still has a text name such as Search."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["⌘", "K"], action: "Open from a page that listens for the shortcut" },
          { id: '1', keys: ["↑", "↓"], action: "Move the active result" },
          { id: '2', keys: ["Home", "End"], action: "First or last result" },
          { id: '3', keys: ["Enter"], action: "Run the active result" },
          { id: '4', keys: ["Esc"], action: "Close" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const confirmDialogGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Confirm Dialog asks the person to choose before a change that cannot be undone, or that is hard to reverse.
          Alert is the default, like iOS. Dialog is a longer explanation. Sheet rises from the bottom. Action is a
          list with Cancel on its own row. Tone is the meaning of the confirm: danger, brand, warning, success, or
          a quiet archive.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Ask once" description="The title is the question. The body is one supporting line. The confirm label is the verb." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Tone is the risk" description="Danger is delete. Brand is publish or send. Warning is leave without saving. Neutral is archive." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Two actions, short labels" description="Cancel and Confirm. Add a third action only for Don’t save. Never a fourth." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use alert for Delete, Log out, and Discard. Two short labels, stacked or split.',
          'Name the confirm as the verb the person is about to do, such as Delete or Publish.',
          'Lock dismiss while the confirm is saving. The busy action keeps a text name.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a confirm for a change that is easy to undo. That is a toast, not a dialog.',
          'Do not put a form in a confirm. That is Modal as a dialog.',
          'Do not label the confirm OK when the action is Delete. The word must match the risk.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Confirm Dialog is a dialog. It takes focus, names itself from the title, and returns focus when it closes."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The title is the question and the accessible name. The body is supporting copy, not a second heading."}</li>
          <li>{"Confirm and Cancel are buttons. The confirm label is the verb, such as Delete or Publish."}</li>
          <li>{"Loading sets aria-busy and blocks dismiss. Cancel is disabled until the work finishes."}</li>
          <li>{"Do not rely on icon color. The title restates a destructive or successful action."}</li>
          <li>{"A third action, if present, is Don’t save or an equivalent. Keep it a short verb."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Esc"], action: "Close when dismissible" },
          { id: '1', keys: ["Tab"], action: "Move through Confirm, the secondary action, and Cancel" },
          { id: '2', keys: ["Enter", "Space"], action: "Activate the focused action" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const emptyPopupGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Empty Popup is the compact empty view inside a menu, command palette, or notification panel. Empty State
          is the page. This is the overlay. Fill is the default panel. Subtle, outline, and pill sit as a card.
          Ghost is type and a glyph. Plain surface drops the panel so the empty can live inside an existing menu.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Stay small" description="A popup is a glance. One title, one line, one action if needed." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Match the menu" description="Use surface plain inside Select, a palette, or a sheet that already has chrome." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One reason" description="No results, an empty inbox, or a failure. Do not mix those stories." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use small in a Select. Use medium in a palette or notification popup.',
          'Name the title as what is missing, such as No results or No notifications.',
          'Use danger only when the popup failed to load.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Empty Popup as a full page. That is Empty State.',
          'Do not stack two sentences. The body is one line.',
          'Do not put a form in the popup empty. That is a Modal.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Empty Popup is a status region named by its title. It is not a live alert unless the tone is danger."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The title is the accessible name. The body is supporting copy."}</li>
          <li>{"If there is an action, it is a Button. Keep the label a short verb."}</li>
          <li>{"Plain surface does not add a dialog role. The parent menu already has one."}</li>
          <li>{"Do not rely on icon color. The title restates a failure such as Could not load."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move to the action" },
          { id: '1', keys: ["Enter", "Space"], action: "Activate the action" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const avatarGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Avatar is a person in the interface. A photo when you have one, initials from the name, a kit icon, or the
          brand mark when nothing else is known. Fill is the default. Subtle, outline, ghost, and pill change the
          chrome. Presence sits on the corner. Avatar Group stacks faces and folds the rest into a count.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One person" description="The name is the accessible label. Initials come from the first and last word." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Photo first" description="A photo replaces initials. If the file is missing, initials remain." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Quiet chrome" description="Fill on a page. Ghost in a dense list. Presence is optional, not decoration." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use small in a table or a Select option. Use large in a profile header. Extra large is the picker.',
          'Pass name even when you have a photo so the label stays correct.',
          'Use Avatar Group for a short set of people. Cap the visible faces and let the rest become a count.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not invent a second accent for presence. Online is success. Away is warning. Busy is danger.',
          'Do not use Avatar as a button. Profile Button wraps it when it opens a menu.',
          'Do not crop a logo into an Avatar. That is Brand Logo.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Avatar is an image of a person. The name is the accessible label. Presence is included in that name when it is set."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The photo is decorative. The name on aria-label is what assistive tech reads."}</li>
        <li>{"If there is no name, the avatar is hidden from assistive tech."}</li>
        <li>{"Loading sets aria-busy. Disabled is visual only; do not make Avatar the only control."}</li>
        <li>{"The group is a list. Each face is a list item. The overflow face is named as N more."}</li>
        <li>{"Do not rely on the presence color alone. The label restates online, away, busy, or offline."}</li>
      </ul>
    </Alert>
  ),
}

export const avatarPickerGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Avatar Picker is how a person adds or changes a profile photo. An empty face is Add photo. A photo with
          onEdit is Edit photo, which should open Avatar Editor. Without onEdit, a second press replaces the file.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One face" description="The name is the accessible label of the avatar. The camera button is Add photo or Edit photo." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Pick, then crop" description="onFile receives the file. Open Avatar Editor with that image. Save writes the crop back to src." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Stay on the face" description="The control sits on the extra-large avatar. Do not add a second Choose file button beside it." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Pass name even when there is a photo so initials remain if the file fails.',
          'Pass onEdit once a photo exists so the next press opens the cropper, not a new file dialog.',
          'Keep accept to jpeg, png, webp, and gif unless the product needs another type.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Avatar alone as the picker. Avatar is not a control.',
          'Do not hide the camera. It is how the person finds Add and Edit.',
          'Do not leave the picker enabled while the editor is saving. Pass disabled.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"The face is an Avatar named from the person. The camera is an Icon Button named Add photo or Edit photo."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Add photo opens the file dialog. Edit photo calls onEdit when a photo exists."}</li>
          <li>{"The file input is visually hidden. The camera button is the only tab stop besides the page."}</li>
          <li>{"Disabled dims the camera. It is not operable."}</li>
          <li>{"Pass name so the avatar still has a label when there is no photo."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the camera button" },
          { id: '1', keys: ["Enter", "Space"], action: "Add or edit the photo" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const avatarEditorGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Avatar Editor is the crop sheet. The person moves, zooms, and rotates a photo, then presses Done. Cancel
          and Done sit in Sheet Nav on black. Choose a Different Photo returns to the file dialog. Remove Photo
          clears the face.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One crop" description="The circle is the saved face. Pinch or the zoom slider. Drag to reposition. Rotate in 90 degree steps or with the slider." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Done writes the file" description="onSave receives a jpeg blob at 512px. Close the sheet after it resolves. Keep saving true while you upload." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Lock while saving" description="Cancel, rotate, and the sliders disable. Done shows Saving. Escape does not dismiss." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Open from Avatar Picker onEdit after a file is chosen, or from Edit photo on an existing src.',
          'Pass onChooseAnother to return to the file dialog. Pass canRemove and onRemove only when a photo already exists.',
          'Keep the sheet on black. Sheet Nav is ghost and onDark.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not nest this sheet in a Modal. It is already a dialog.',
          'Do not leave the overlay open after a failed save without the error line. The editor already shows the message.',
          'Do not crop to a square file and then round it again in Avatar. The editor already exports the circle.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Avatar Editor is a modal dialog named Move and Scale. Focus stays in the sheet until Cancel or Done."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"role dialog and aria-modal. The title is Move and Scale. The subtitle explains pinch and drag."}</li>
          <li>{"Cancel, Done, rotate, zoom, and rotation are named controls. Done sets aria-busy while saving."}</li>
          <li>{"Escape calls onCancel when the sheet is not busy. The page behind does not scroll."}</li>
          <li>{"Choose a Different Photo and Remove Photo are Anchors. Remove uses the danger tone."}</li>
          <li>{"The crop canvas is visual. Zoom and Rotation sliders are the accessible way to adjust the crop."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Esc"], action: "Close when not saving" },
          { id: '1', keys: ["Tab"], action: "Move through Cancel, Done, zoom, rotate, and footer actions" },
          { id: '2', keys: ["Enter", "Space"], action: "Activate the focused action" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const keyValueRowGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Key Value Row is a label on the left and a value on the right, the same quiet pair Apple uses in Settings
          and About. Fill is the default hairline list. Subtle, outline, and pill sit as a card. Ghost is type with
          no chrome. Wrap a set in Key Value Group so the last row drops its divider.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Read left to right" description="The label names the field. The value is the current answer, quieter, and truncates if it is long." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One action" description="Copyable turns the value blue. A chevron means the row opens something. Do not do both." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Group the set" description="An account card is a group. A single spec line can stand alone. Do not mix variants inside one group." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill in a settings card. Use pill for a single fact on a page. Use stacked when the value is an address or a long id.',
          'Pass copyable for an email, a key, or an id the person is meant to take with them.',
          'Use Not set when the value is missing. Keep the label. Do not hide the row.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use a row as a form field. That is Text Field or Settings Row.',
          'Do not put a primary button in the trailing slot. A chevron, a badge, or a check is enough.',
          'Do not mark every value in brand blue. Blue is for copy and links.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"A static row is read as label, then value. A copyable or linked row is a control named from both."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Copyable is a button. The name is Copy, then the label, then the value. After a copy it becomes Copied."}</li>
          <li>{"href renders a link. onClick renders a button. Both include a chevron unless you pass chevron false."}</li>
          <li>{"Loading sets aria-busy and replaces the value with a placeholder bone."}</li>
          <li>{"Disabled is visual and not operable. Invalid sets aria-invalid and danger type on the value."}</li>
          <li>{"Do not rely on color. Not set, Copied, and an error hint restate the state in words."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move to the next copyable or linked row" },
          { id: '1', keys: ["Enter", "Space"], action: "Copy, or activate the row" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const badgeGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Badge is a compact status, count, or category label. Subtle is the default, the same quiet tint Apple uses in
          Settings and lists. Fill is solid. Outline is a wireframe. Ghost is ink only. Pill is a slightly taller chip.
          Teal is verified. Green is success. Orange is a review. Red is a problem or a count.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One word" description="New, Live, Beta, Pro. A badge is a status, not a sentence. The row or heading carries the rest." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Teal is verified" description="Verified and active use accent teal. Success green is for a completed action. Do not mix them on the same row." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Count is a number" description="Pass count for a notification. Zero hides it. Overflow becomes 99+." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use subtle in a table or a settings row. Use fill for New or a notification count. Use ghost in a dense list.',
          'Add a leading dot for Live or Active. Use pulse only when the status is happening now.',
          'Keep small in a table. Medium is the default. Large sits next to a heading.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use teal as a second call to action. It is only for verified, active, and success badges.',
          'Do not put a badge on every row. Reserve it for a state that is not already in the copy.',
          'Do not use danger fill for a category. Danger is an error, a destructive tag, or a notification count.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Badge is a label. The words are the name. A count and a dot-only mark still need a name."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The label text is the accessible name when it is visible."}</li>
        <li>{"A count-only badge uses the formatted number as the name. Zero is hidden, not announced as zero."}</li>
        <li>{"A dot-only badge uses the tone as the name, such as verified status. Prefer a visible word when the status matters."}</li>
        <li>{"Loading sets aria-busy. Disabled is visual only unless the badge is a control."}</li>
        <li>{"onClick turns the badge into a button. onDismiss is a separate remove control with its own label."}</li>
        <li>{"Do not rely on color alone. Pair danger with Failed, warning with In review, teal with Verified."}</li>
      </ul>
    </Alert>
  ),
}

export const cardGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Card is a quiet surface for one idea. Fill is the default tile. Subtle, outline, ghost, and pill match the
          rest of the kit. A title names the thing. Supporting copy, media, an icon, and actions are optional. Keep one
          story on the card.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One idea" description="A card holds one project, one feature, or one destination. Split extra stories onto more cards." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Match the row" description={'In a grid, pass fullHeight so neighbors share a height. Pass fullWidth={false} when a card should hug its copy.'} />
        <Card variant="subtle" size="sm" eyebrow="03" title="Press to go" description="href and onClick turn the whole card into a control. Keep buttons in the footer only when the card itself is not pressable." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use a grid of fill cards for an overview. Pass fullHeight so a short card matches its neighbor.',
          'Pass fullWidth={false} for a compact tile beside a wider one. Keep equal columns when the set is a pair.',
          'Use selected for a chosen card in a set. Loading holds the layout until the copy arrives.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put two primary actions on one card. One destination, or one footer button.',
          'Do not nest a button inside a pressable card. The card is already the control.',
          'Do not use Card for a single metric. That is Stat Card.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Card is a named surface. The title is the accessible name. Media is decorative unless you pass a real image with its own text."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The title is referenced with aria-labelledby. It is a heading on a static card and a paragraph on a pressable card."}</li>
        <li>{"href renders a link. onClick renders a button. Disabled and loading are not operable."}</li>
        <li>{"Loading sets aria-busy. Selected sets aria-pressed on a button and aria-current on a link."}</li>
        <li>{"Do not rely on tone color alone. Pair danger with words such as Failed, and success with Active."}</li>
        <li>{"Keep footer actions outside a pressable card so the control has a single job."}</li>
      </ul>
    </Alert>
  ),
}

export const cardGridGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Card Grid lays out a set of cards. Two, three, or four columns on larger screens, then one or two on a phone.
          Stretch keeps a row the same height. Start lets each card hug its copy. Equal width shares the row. Fit hugs
          the copy. Mixed keeps the first card compact and lets the rest fill.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Count first" description="Pick columns from how many cards belong together, not from the size of the window." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Match the row" description="Stretch is the default so a short card matches its neighbors. Start is for a masonry of different stories." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One job each" description="Every cell is a Card. Do not mix a metric tile, a form, and a caption in the same grid." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use two columns for a pair, three for an overview, four for a compact gallery.',
          'Pass align start when the copy lengths should stay honest. Pass widths fit for a row of compact tiles.',
          'Keep one primary action per card, or none if the card itself is the link.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not force four columns on a phone. The grid already collapses.',
          'Do not mix Card with unrelated blocks in this grid.',
          'Do not use Card Grid for a single metric row. That is a set of Stat Cards.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Card Grid is layout. Reading order is the order of the cards in the markup."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"Put the primary card first. Screen readers follow that order on every breakpoint."}</li>
        <li>{"Each card still has its own name from its title."}</li>
        <li>{"Do not wrap the grid in a list unless every child is a list item."}</li>
        <li>{"Collapsed columns on a small screen must not hide a card. Every card stays in the flow."}</li>
      </ul>
    </Alert>
  ),
}

export const statCardGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Stat Card is a headline metric. Fill is the default, the same quiet tile Apple uses for Fitness and Health.
          Subtle, outline, ghost, and pill match the rest of the kit. The number is the story. Delta, hint, icon, and
          sparkline are optional support — never decoration.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One number" description="The value is already formatted. A unit sits beside it when the number needs a scale, such as hrs or /mo." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Delta is the change" description="Up is success. Down is danger. Invert when a drop is the win, such as open tickets. Neutral is unchanged." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Quiet chrome" description="Fill on a dashboard. Ghost in a dense row. Tone tints the tile only when the metric itself is semantic." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use a grid of fill cards for an overview. Use small in a sidebar. Use large for a single featured number.',
          'Pass invert on a delta when fewer is better. Keep the hint as the period, such as vs last month.',
          'Add an icon or a sparkline when they help scan a set. Keep both optional.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Stat Card as a button for a primary action. href and onClick are for opening the detail behind the number.',
          'Do not invent a second accent. Brand is the only interactive color. Success and danger belong to the delta.',
          'Do not leave a loading card after you know the value. Swap loading off. Empty is an em dash, not a zero.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <Alert title="Requirements">
      <p className="m-0">{"Stat Card is a named metric. The label is the accessible name. The value, delta, and hint are visible support."}</p>
      <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
        <li>{"The label is referenced with aria-labelledby. The value is not a heading."}</li>
        <li>{"A sparkline is decorative. The delta chip restates the change in text."}</li>
        <li>{"href renders a link. onClick renders a button. Disabled and loading are not operable."}</li>
        <li>{"Loading sets aria-busy. Empty shows an em dash and keeps the label."}</li>
        <li>{"Do not rely on delta color alone. The value string includes the sign or the word unchanged."}</li>
      </ul>
    </Alert>
  ),
}

export const breadcrumbGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Breadcrumb is the path back through the hierarchy. Ghost is the default, the same quiet trail Apple uses in
          Settings and Finder. Subtle, outline, and fill sit on a surface. Pill is a compact chip trail. The last item
          is the current page. Everything before it is a way back.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="The last item is here" description="Current is primary and medium. It is not a link. Ancestors are tertiary until they are hovered or focused." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One accent" description="Hover and focus use brand blue. Do not underline, and do not paint the current page as a filled button." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Collapse, don’t wrap forever" description="If the path is long, pass maxItems. The ellipsis holds the middle pages in a menu. Keep the first and last in view." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use ghost on a page. Use subtle or outline in a toolbar or card. Use pill when the trail sits next to other chips.',
          'Pass href or onClick on ancestors so the path is a real way back. Keep the current item as text.',
          'Use a home icon on the first crumb when the root has no useful label. Keep the accessible name.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Breadcrumb for peer views. That is Tabs.',
          'Do not put a primary Button in the trail. The current page is already the destination.',
          'Do not show more than one current item. The last crumb is the page.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Breadcrumb is a navigation landmark. The list is an ordered path. The last item is the current page."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"nav with an accessible name, default Breadcrumb. ol holds the crumbs in order."}</li>
          <li>{"Ancestors with href render as links. Ancestors with onClick render as buttons. The current page is a span with aria-current=\"page\"."}</li>
          <li>{"Disabled crumbs are not in the keyboard cycle. They stay visible so the path does not jump."}</li>
          <li>{"The ellipsis is a button named Show more pages. It opens a list of the hidden ancestors."}</li>
          <li>{"An icon-only crumb still has a text label. The icon is decorative."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move through ancestor links or buttons" },
          { id: '1', keys: ["Enter", "Space"], action: "Follow the focused crumb, or open the overflow" },
          { id: '2', keys: ["Escape"], action: "Close the overflow menu" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const tableGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Table is a structured list of records. Fill is the default — a quiet card with a tinted header, the same
          treatment Apple uses for Music playlists and Admin lists. Subtle and pill sit on a secondary surface.
          Outline is a wireframe. Ghost is rows and hairlines with no chrome.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One object" description="Caption, rows, and footer share one frame. Do not float a title above a disconnected table." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Hairlines, not boxes" description="Rows divide with a subtle line. Selection is a brand-tinted fill. Nothing casts a shadow." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Edit in place" description="Double-click a cell, or Return or F2 on the focused row. Escape cancels. Tab commits and moves. The value stays in the cell — no dialog." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill on a page. Use subtle or pill inside a card. Use ghost when the table sits under a page header that already names the list.',
          'Use small in a dense log. Use medium for product lists. Use large when each row is a person with an avatar.',
          'Pass editable for inline edits. Mark a Badge or action column editable={false}.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not paint selected rows in teal or a second accent. Brand primary subtle is the only selected fill.',
          'Do not wrap every cell in a card. The row is the unit.',
          'Do not open a modal to rename a cell. Double-click and type.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Table is a region that contains a real table. Headers are column headers. Selected rows are marked. Sortable headers expose aria-sort."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"A caption string becomes the accessible name. Otherwise pass aria-label."}</li>
          <li>{"Selectable rows set aria-selected. The header checkbox is mixed when the page is partly selected."}</li>
          <li>{"Sortable headers are buttons. aria-sort is ascending, descending, or none."}</li>
          <li>{"Disabled rows stay visible and are skipped by arrow keys."}</li>
          <li>{"loading sets aria-busy. Empty is a single cell that names the blank view."}</li>
          <li>{"Arrow keys move row focus. Left and right move the active cell when the table is editable."}</li>
          <li>{"Return or F2 edits the active cell. Double-click does the same. Escape cancels. Tab commits and moves."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move to the table, then through sortable headers and checkboxes" },
          { id: '1', keys: ["ArrowUp", "ArrowDown"], action: "Move between enabled rows" },
          { id: '2', keys: ["ArrowLeft", "ArrowRight"], action: "Move the active cell when editing is on" },
          { id: '3', keys: ["Home", "End"], action: "First or last enabled row" },
          { id: '4', keys: ["Enter", "F2"], action: "Edit the active cell" },
          { id: '5', keys: ["Escape"], action: "Cancel the edit" },
          { id: '6', keys: ["Tab"], action: "While editing, commit and move to the next cell" },
          { id: '7', keys: ["Space"], action: "Select the focused row" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const pageHeaderGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Page Header is the title of a view. Ghost is the default, the same quiet start Apple uses on Settings and
          Files — type on the page, actions on the trailing edge. Subtle, outline, fill, and pill sit as a card.
          Split puts actions beside the title from tablet up. Stack keeps them under the copy. Center is a hero.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One title" description="The heading names the view. The description is one supporting line. Actions are verbs for this page." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Deference" description="Ghost has no chrome. Use a surface only when the header sits inside a card, not on the page itself." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Actions stay few" description="One primary button is enough. A secondary action is quieter. Icon buttons are for tools, not a second CTA." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use ghost on a page. Use subtle or outline when the header sits in a card. Use pill for a nested well.',
          'Use small in a nested view or a compact list. Use large only for a hero or a first-run page.',
          'Keep the title short. Put the rest in the description, a badge, or the first row of the page.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put a second heading in the header. Breadcrumbs, an eyebrow, and the title are enough.',
          'Do not stretch a primary button across the row on desktop. Compact pills sit on the trailing edge.',
          'Do not restyle the title in teal. Brand blue is for the action, not the heading.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Page Header is the heading of the view. The title is a real heading. Actions are buttons the person can reach next."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The title is an h1 by default. Pass as when the visual size and the document outline disagree."}</li>
          <li>{"Eyebrow and description are supporting copy, not headings."}</li>
          <li>{"Back is a button named Back. Pass leading for a custom control with its own name."}</li>
          <li>{"Loading sets aria-busy. The title stays available to assistive tech as a visually hidden name."}</li>
          <li>{"Disabled dims the actions. They stay in the tree."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move to Back, then to each action" },
          { id: '1', keys: ["Enter", "Space"], action: "Activate the focused action" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const paginationGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Pagination moves through a paged list. Primary is the default — the current page is a filled mark, the
          neighbors stay quiet. When the set is long, the numbers collapse to first, last, and a window around here:
          1 … 12 13 14 … 48. Compact writes the page as a line. Simple is previous and next only.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Keep first and last" description="The ends stay visible. The ellipsis is not a control. It only means pages are hidden." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One current" description="The selected number uses brand fill. Neighbors are secondary until they are hovered." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Collapse, don’t wrap" description="If there are too many pages, hide the middle. Do not show every number in a wrapping grid." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use numbers under a table or a search result. Use compact in a tight footer. Use simple when the page is already named nearby.',
          'Pass showFirstLast when jumping to the ends matters, such as a long export log.',
          'Disable the control while the next page loads. The current mark can show a spinner.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Pagination for peer views. That is Tabs.',
          'Do not list every page when the count is large. The ellipsis is the design.',
          'Do not paint previous and next as primary Buttons. They sit beside the numbers, quiet until pressed.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Pagination is a navigation landmark. Each page is a button. The current page is marked. The ellipsis is not operable."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"nav with an accessible name, default Pagination."}</li>
          <li>{"The current page has aria-current=\"page\". Previous, next, first, and last have aria-label."}</li>
          <li>{"The ellipsis is a visual gap. It is hidden from assistive tech."}</li>
          <li>{"Disabled previous and next stay visible so the control does not jump at the ends."}</li>
          <li>{"loading sets aria-busy and disables every control. The current mark shows a spinner."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move through previous, page numbers, and next" },
          { id: '1', keys: ["Enter", "Space"], action: "Go to the focused page" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const authNavGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Auth Nav is the 44px bar on sign-in and related flows. The mark is Brand Logo. Appearance is Theme Toggle
          compact. The trailing action is Anchor — brand blue, underline on hover. Auth Layout places this bar on the
          page; do not rebuild the row by hand.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Three pieces" description="Logo home, theme, optional link. Nothing else belongs in this bar." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Use the kit" description="Brand Logo, Theme Toggle, and Anchor. Do not restyle a raw header to look like this bar." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One destination" description="The trailing Anchor is the peer flow: Create one on sign-in, Sign in on create account." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Pass navLinkTo and navLinkLabel for the peer auth page.',
          'Omit both when the flow has no alternate, such as setup.',
          'Keep the bar on the page background. Do not frost it like a marketing header.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put search, bag, or marketing links here.',
          'Do not replace Anchor with a button or a second accent color.',
          'Do not rebuild the row with raw links and a custom switch.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Auth Nav is the header of an auth page. The logo names the product. Theme Toggle names appearance. The trailing Anchor names the peer flow."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The logo link uses the product name as its accessible label. The mark inside it is decorative."}</li>
          <li>{"Theme Toggle compact exposes Light, Dark, and a switch. Do not add a second appearance control in the same header."}</li>
          <li>{"The trailing Anchor is a real link with visible text. Do not replace it with an icon-only control."}</li>
          <li>{"The bar is 44px tall. Keep hit targets inside that height."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move from the logo to Theme Toggle, then the trailing link" },
          { id: '1', keys: ["Enter", "Space"], action: "Activate the focused control" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const sheetNavGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Sheet Nav is the bar at the top of a sheet. Cancel, Back, and Done are Anchor — brand blue, underline on
          hover. Close is a quiet dismiss. Back is a nested sheet. Large drops the title below the bar. Prominent fills
          Done as a blue pill.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Blue is the action" description="Cancel, Back, and Done are Anchor in brand primary. Close is a gray mark so it does not compete with Done." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Title stays centered" description="The heading sits in the middle regardless of how wide the actions are. It truncates before it collides." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Done is the emphasis" description="Done is semibold. Cancel is regular. Prominent fills Done when the sheet is a short create flow." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use plain for Edit, New, and any form that can be cancelled or saved.',
          'Use close when dismiss is the only leading action. Use back when the sheet is nested.',
          'Pass onDark when the sheet sits on black, such as Move and Scale.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not restyle Done as teal or a second accent. Brand blue is the only action color.',
          'Do not put a second title in the sheet body. The bar already names the task.',
          'Do not hide Cancel while work is saving. Disable it. The person still needs a way out after the wait.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Sheet Nav is the heading row of a dialog. The title names the sheet. Each action has a text name."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The title is visible text in the header. Use it as the accessible name of the sheet."}</li>
          <li>{"Cancel, Close, and Back are Anchor without an href, so they render as buttons. All three call onCancel."}</li>
          <li>{"Done sets aria-busy while loading. The label stays a word, such as Saving."}</li>
          <li>{"Disabled actions stay in the tree. They are not removed while the sheet is busy."}</li>
          <li>{"The title truncates visually. Keep the heading short so it is not cut off."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move between Cancel and Done" },
          { id: '1', keys: ["Enter", "Space"], action: "Activate the focused action" },
          { id: '2', keys: ["Esc"], action: "Dismiss the sheet when the parent allows it" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const profileButtonGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Profile Button is the account control. Avatar is the default — a face that opens a menu. Fill is the
          toolbar ring. Ghost is the photo alone. Labeled adds the name. Menu adds a caret. Identity is the
          Settings row: name, email, and a caret. Presence and a badge sit on the face.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="One person" description="The name is the accessible label. A photo replaces initials. Presence is optional." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Avatar in chrome" description="Use avatar in a top bar. Use labeled or menu in a header. Identity is a row." />
        <Card variant="subtle" size="sm" eyebrow="03" title="The caret means a menu" description="Menu and identity set aria-haspopup. Pass open while the menu is visible." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use small in a 52px nav. Use medium when the control stands alone. Large is a settings row.',
          'Pass name even when you have a photo so the label stays correct.',
          'Use a badge for unread account notices. Keep the number short.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Avatar as the button. Profile Button owns the hit target and the name.',
          'Do not put a second accent on the face. Tone is for initials. Presence is status.',
          'Do not hide the caret on a menu trigger. The caret is how the menu is announced visually.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Profile Button is a native button. The name is the accessible label. Presence and email are included in that name when they are set."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"aria-label is built from the name, subtitle, and presence. Override it only when the action is not “open profile”."}</li>
          <li>{"Menu and identity set aria-haspopup=\"menu\". Pass open to set aria-expanded while the menu is visible."}</li>
          <li>{"Loading sets aria-busy and replaces the face with a spinner. Disabled is not focusable."}</li>
          <li>{"The photo, initials, caret, and badge are decorative. The button name still makes sense if they are empty."}</li>
          <li>{"Tab to focus, Space or Enter to press. Do not nest another control inside the button."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move focus to the control" },
          { id: '1', keys: ["Space"], action: "Activate" },
          { id: '2', keys: ["Enter"], action: "Activate" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const tabsGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Tabs switch between peer views. Underline is the default, the same sliding bar Apple uses in Safari and
          Finder. Subtle, outline, and pill sit in a well. Ghost is type only. Keep the row to a sidebar column when
          it sits beside a list. Use Segmented Control when the set is a filter of two to five options, not a change
          of view.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Peer views" description="Each tab is a whole view. The selected label names what is on screen." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One row" description="Tabs stay on one row. If the row is tight, labels truncate. Keep the set short enough to scan." />
        <Card variant="subtle" size="sm" eyebrow="03" title="The bar follows" description="The indicator moves with the selected tab. Do not restyle it as a second accent." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use underline on a page. Use subtle or pill in a card or a toolbar.',
          'Use a badge for a count, such as unread. Keep the number short.',
          'Disable a tab rather than hiding it, so the set stays stable.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Tabs for two to five filters that stay on one view. That is Segmented Control.',
          'Do not put a primary Button inside the tab list.',
          'Do not use Icon Tab here. That is the compact bar at the bottom of an app shell.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Tabs is a tablist. One tab is selected. Arrow keys move to the next enabled tab. The page owns the panel."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"role=\"tablist\" on the row, role=\"tab\" on each tab, aria-selected on the selected id."}</li>
          <li>{"Only the selected tab is in the tab order. Arrow keys, Home, and End move selection."}</li>
          <li>{"Disabled tabs are not in the keyboard cycle. The list can also be disabled as a whole."}</li>
          <li>{"Pass aria-label when there is no visible heading that names the set."}</li>
          <li>{"A badge is a count. The tab label still names the view."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the selected tab" },
          { id: '1', keys: ["ArrowLeft", "ArrowRight"], action: "Move to the next enabled tab" },
          { id: '2', keys: ["Home", "End"], action: "First or last enabled tab" },
          { id: '3', keys: ["Enter", "Space"], action: "Select the focused tab" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const sidebarNavGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Sidebar Nav is the primary wayfinding for an app shell. It is full height, from the brand at the top to
          the account or appearance control at the foot. Fill is the default, the same gray column Apple uses in
          Mail and Settings. Subtle, outline, ghost, and pill change the chrome. Collapse it to a rail of icons
          when the canvas needs the width.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="The brand lives here" description="The mark sits in the sidebar, not in the top bar. The two edges meet at 52px so the shell reads as one frame." />
        <Card variant="subtle" size="sm" eyebrow="02" title="One selected place" description="The current item uses the brand tint. Hover and press stay gray. Danger is only for a destination such as Log out." />
        <Card variant="subtle" size="sm" eyebrow="03" title="Groups, not a pile" description="Section labels make a long list scannable. Collapse a group only when the person asked for it." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use fill on a page. Use subtle when the sidebar should sit on white. Use pill when it should float inside the shell.',
          'Keep labels short. A badge is a count, not a status sentence.',
          'Put Theme Toggle or the signed-in person at the foot. Do not duplicate the brand in the top bar.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not put the brand in both the sidebar and the top bar.',
          'Do not use Sidebar Nav for peer views of one page. That is Tabs.',
          'Do not paint the selected row in a second accent. Brand is the only tint.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Sidebar Nav is a navigation landmark. The selected item is the current page. Collapse is a separate control."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"The aside is labeled Sidebar. Each item is a button. aria-current=\"page\" marks the selected id."}</li>
          <li>{"Disabled items stay visible and are not in the click cycle."}</li>
          <li>{"The collapse control is an icon button. Expanded announces Collapse sidebar. Collapsed announces Expand sidebar."}</li>
          <li>{"A badge is a count. The item label still names the destination."}</li>
          <li>{"In the rail, the visible label is hidden. The button title and accessible name remain the same string."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Move through items, search, and collapse" },
          { id: '1', keys: ["Enter", "Space"], action: "Select the focused item, or toggle collapse" },
          { id: '2', keys: ["Escape"], action: "Close the mobile drawer" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const navSearchGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Nav Search is the compact field in a top bar. Pill is the default, the same capsule as Finder and Safari.
          Subtle sits on a card. Outline holds an edge on a busy chrome. Ghost stays quiet until hover. Icon collapses
          to a magnifying glass and opens on focus. Pair it with a toolbar — not with a form label.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Toolbar, not form" description="This is a find control in chrome. Use Text Field with the pill variant when search lives in a page or a modal." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Clear in place" description="A filled query shows the gray clear mark. Escape clears, then blurs. Do not add a second Cancel beside it." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One width" description="Small fits a 52px bar. Medium is the standard toolbar. Large is a touch target. Do not stretch it across the nav." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use pill in a compact top bar. Use icon in a marketing header where space is the constraint.',
          'Pass shortcut when a command palette is bound to the same query, such as ⌘K.',
          'Show loading by replacing the glass with the spinner while results resolve.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Nav Search as the only field on a settings page. That is Text Field.',
          'Do not hide the glass. The glyph is how the control reads as search at a glance.',
          'Do not mix a custom height. Small, medium, and large already match the bar.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"Nav Search is a labeled search input. The placeholder is a hint. The accessible name is the label, or the placeholder when no label is passed."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"Native type=\"search\" input. The wrapping label points at it with htmlFor."}</li>
          <li>{"Focus is a 2px brand ring on the field. Icon variant expands on focus and collapses on blur when empty."}</li>
          <li>{"Clear is a button with the name “Clear search”. It is out of the tab order so typing is not interrupted. Escape clears first."}</li>
          <li>{"Loading sets aria-busy on the field. The spinner is decorative."}</li>
          <li>{"Disabled is not operable. Shortcut text is hidden from assistive tech — it is a visual hint only."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the field. Icon variant expands." },
          { id: '1', keys: ["Escape"], action: "Clear the query, then collapse or blur" },
          { id: '2', keys: ["Enter"], action: "Submit the current query" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}

export const iconTabGuide = {
  usage: (
    <DocsUsage>
        <Body>
          Icon Tab is the compact destination bar at the bottom of an app shell. Ghost is the default — icon over a
          short label, selected in brand. Subtle, outline, and pill sit in a well with a sliding thumb. Fill paints
          the selected item. Use Tabs when the views are peers of one page, not places in the app.
        </Body>
      <CardGrid columns={3} gap="sm">
        <Card variant="subtle" size="sm" eyebrow="01" title="Places, not filters" description="Each item is a destination. Home, Inbox, Profile — not All, Live, Review." />
        <Card variant="subtle" size="sm" eyebrow="02" title="Stacked first" description="Icon above a 10–12px caption is the phone bar. Inline and icon are for a toolbar." />
        <Card variant="subtle" size="sm" eyebrow="03" title="One tint" description="Selected is brand. Danger is only for a destructive destination such as Log out." />
      </CardGrid>
      <CardGrid columns={2} gap="sm">
        <RuleCard size="sm" tone="success" title="Do" items={[
          'Use IconTabBar for a set. Keep three to five items so each label stays readable.',
          'Pass a badge for a count on the icon. Keep the number short.',
          'Use inline in a compact toolbar. Use icon when the label would repeat a nearby heading.',
        ]} />
        <RuleCard size="sm" tone="danger" title="Don’t" items={[
          'Do not use Icon Tab for peer views of one list. That is Tabs.',
          'Do not mix a primary Button into the bar.',
          'Do not leave the selected item in gray. The tint is the wayfinding.',
        ]} />
      </CardGrid>
    </DocsUsage>
  ),
  accessibility: (
        <div className="flex flex-col gap-4">
      <Alert title="Requirements">
        <p className="m-0">{"IconTabBar is a tablist. One destination is selected. Arrow keys move to the next enabled item. The page owns the panel."}</p>
        <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
          <li>{"role=\"tablist\" on the bar, role=\"tab\" on each item, aria-selected on the selected id."}</li>
          <li>{"Only the selected tab is in the tab order. Arrow keys, Home, and End move selection."}</li>
          <li>{"Stacked and inline show the label. Icon layout uses aria-label from the same string."}</li>
          <li>{"A badge is a count. The tab label still names the destination."}</li>
          <li>{"Standalone IconTab is a button. Use it for a single control, such as Log out beside the bar."}</li>
        </ul>
      </Alert>
      <DataTable
        size="sm"
        variant="subtle"
        minWidth="320px"
        aria-label="Keyboard shortcuts"
        data={[
          { id: '0', keys: ["Tab"], action: "Focus the selected destination" },
          { id: '1', keys: ["ArrowLeft", "ArrowRight"], action: "Move to the next enabled item" },
          { id: '2', keys: ["Home", "End"], action: "First or last enabled item" },
          { id: '3', keys: ["Enter", "Space"], action: "Select the focused item" },
        ]}
        rowKey={(row) => row.id}
        columns={SHORTCUT_COLUMNS}
      />
    </div>
  ),
}


