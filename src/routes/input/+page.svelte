<script lang="ts">
	import InputBooleanCode from '$lib/input/InputBoolean.svelte?raw'
	import InputCheckboxesCode from '$lib/input/InputCheckboxes.svelte?raw'
	import InputDateTimeCode from '$lib/input/InputDateTime.svelte?raw'
	import InputNumberCode from '$lib/input/InputNumber.svelte?raw'
	import InputRadioCode from '$lib/input/InputRadio.svelte?raw'
	import InputRangeCode from '$lib/input/InputRange.svelte?raw'
	import InputSelectCode from '$lib/input/InputSelect.svelte?raw'
	import InputSelectNativeCode from '$lib/input/InputSelectNative.svelte?raw'
	import InputStringCode from '$lib/input/InputString.svelte?raw'
	import InputTextareaCode from '$lib/input/InputTextarea.svelte?raw'
	import DocExample from '$lib/_doc/DocExample.svelte'
	import { DocProps, DocSection } from '$lib/_doc/index.ts'
	import { parseProps } from '$lib/_doc/parse-props.ts'
	import BooleanExample from './examples/Boolean.svelte'
	import booleanCode from './examples/Boolean.svelte?raw'
	import Checkboxes from './examples/Checkboxes.svelte'
	import checkboxesCode from './examples/Checkboxes.svelte?raw'
	import DateTimeExample from './examples/DateTime.svelte'
	import dateTimeCode from './examples/DateTime.svelte?raw'
	import NumberExample from './examples/Number.svelte'
	import numberCode from './examples/Number.svelte?raw'
	import Radio from './examples/Radio.svelte'
	import radioCode from './examples/Radio.svelte?raw'
	import Range from './examples/Range.svelte'
	import rangeCode from './examples/Range.svelte?raw'
	import Select from './examples/Select.svelte'
	import selectCode from './examples/Select.svelte?raw'
	import SelectNative from './examples/SelectNative.svelte'
	import selectNativeCode from './examples/SelectNative.svelte?raw'
	import StringExample from './examples/String.svelte'
	import stringCode from './examples/String.svelte?raw'
	import Textarea from './examples/Textarea.svelte'
	import textareaCode from './examples/Textarea.svelte?raw'
</script>

<DocSection title="InputString" description="TODO: write a small description">
	<DocProps props={parseProps(InputStringCode)} />
	<DocExample code={stringCode}>
		{#snippet preview()}<StringExample />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputNumber" description="TODO: write a small description">
	<DocProps props={parseProps(InputNumberCode)} />
	<DocExample code={numberCode}>
		{#snippet preview()}<NumberExample />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputBoolean" description="TODO: write a small description">
	<DocProps props={parseProps(InputBooleanCode)} />
	<DocExample code={booleanCode}>
		{#snippet preview()}<BooleanExample />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputDateTime" description="TODO: write a small description">
	<DocProps props={parseProps(InputDateTimeCode)} />
	<DocExample code={dateTimeCode}>
		{#snippet preview()}<DateTimeExample />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputTextarea" description="TODO: write a small description">
	<DocProps props={parseProps(InputTextareaCode)} />
	<DocExample code={textareaCode}>
		{#snippet preview()}<Textarea />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputRange" description="TODO: write a small description">
	<DocProps props={parseProps(InputRangeCode)} />
	<DocExample code={rangeCode}>
		{#snippet preview()}<Range />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputRadio" description="TODO: write a small description">
	<DocProps props={parseProps(InputRadioCode)} />
	<DocExample code={radioCode}>
		{#snippet preview()}<Radio />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputCheckboxes" description="TODO: write a small description">
	<DocProps props={parseProps(InputCheckboxesCode)} />
	<DocExample code={checkboxesCode}>
		{#snippet preview()}<Checkboxes />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputSelectNative" description="TODO: write a small description">
	<DocProps props={parseProps(InputSelectNativeCode)} />
	<DocExample code={selectNativeCode}>
		{#snippet preview()}<SelectNative />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="InputSelect" description="TODO: write a small description">
	<DocProps props={parseProps(InputSelectCode)} />
	<DocExample code={selectCode}>
		{#snippet preview()}<Select />{/snippet}
	</DocExample>
</DocSection>
