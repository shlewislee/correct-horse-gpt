<script lang="ts">
	import { words_list } from '$lib/words';
	import { koreanList } from '$lib/words/korean';
	import { getRandomButtonText } from '$lib/words/buttonTexts';
	import { hangulToLatin } from '$lib/conversion';
	import { getRandomWords } from '$lib/utils';
	import confetti from 'canvas-confetti';
	import { Turnstile } from 'svelte-turnstile';
	import Spinner from './spinner.svelte';

	interface OptionConfig {
		lang: 'en' | 'ko';
		suffixRandomNumber: boolean;
		separator: string;
		wordcount: number;
		wordset: 'small' | 'medium' | 'large';
		useNumber: boolean;
	}

	let option: OptionConfig = {
		lang: 'en',
		suffixRandomNumber: true,
		separator: '-',
		wordcount: 4,
		wordset: 'small',
		useNumber: true
	};
	let generatedPhrase: string = 'correct-horse-battery-staple-0';
	let cleanGeneratedWords = ['correct', 'horse', 'battery', 'staple', 0];
	let hangulConverted = '';

	let loadingGeneration = false;
	let generatedStory = 'The correct horse needed a battery to staple 0 documents.';

	let buttonText = getRandomButtonText();

	let reset: () => void | undefined;

	let cfToken = '';

	function generatePassphrase(option: OptionConfig) {
		let result = '';
		let words = [];
		if (option.lang === 'ko') {
			words = getRandomWords(koreanList, option.wordcount);
		} else {
			words = getRandomWords(words_list[option.wordset], option.wordcount);
		}
		if (option.useNumber) {
			words.push(Math.floor(Math.random() * 10).toString());
		}

		result = words.join(option.separator);
		hangulConverted = option.lang === 'ko' ? hangulToLatin(result) : '';
		cleanGeneratedWords = words;
		generatedStory = '';

		return result;
	}

	function changeSeparator(option: OptionConfig) {
		let result = '';
		result = cleanGeneratedWords.join(option.separator);
		hangulConverted = option.lang === 'ko' ? hangulToLatin(result) : '';

		return result;
	}

	function shootCopyConfetti() {
		const copied = confetti.shapeFromText({ text: '🐴', scalar: 4 });
		confetti({
			particleCount: 15,
			shapes: [copied],
			scalar: 2.4,
			spread: 180
		});
	}

	async function handleGenerationRequest() {
		loadingGeneration = true;
		const res = await fetch('/generate', {
			method: 'POST',
			body: JSON.stringify({
				cfToken,
				words: cleanGeneratedWords
			})
		});
		const resJson = await res.json();
		generatedStory = resJson.message;
		reset?.(); // reset needed to re-generate
		loadingGeneration = false;
	}

	$: option.wordcount;
	$: generatedPhrase;
	$: generatedStory;
</script>

<div class="mx-auto mt-auto flex max-w-2xl flex-col flex-wrap gap-2 pt-4 pb-2 md:w-1/2">
	<div class="flex flex-col gap-2">
		<input
			type="text"
			name="generated-passphrase"
			id="pw-input"
			bind:value={generatedPhrase}
			readonly
			class="grow cursor-pointer border p-4 text-center text-xl shadow-md"
			on:mousedown={async () => {
				await navigator.clipboard.writeText(generatedPhrase);
				shootCopyConfetti();
			}}
		/>
		{#if option.lang == 'ko'}
			<input
				type="text"
				name="converted-passphrase"
				id="pw-converted"
				bind:value={hangulConverted}
				readonly
				class="grow cursor-pointer border p-2 text-center text-sm shadow-sm"
				on:mousedown={async () => {
					await navigator.clipboard.writeText(hangulConverted);
					shootCopyConfetti();
				}}
			/>
		{/if}
		<p class="text-center text-xs text-gray-400 italic">
			{option.lang == 'en' ? 'Click the box to copy' : 'Click the boxes to copy'}
		</p>
	</div>
	<div class="flex flex-col gap-4 border p-6">
		<div class="flex flex-row">
			<label for="language" class="my-auto">Language</label>
			<select
				name="language"
				class="ml-auto w-24 p-2 md:w-48"
				id="language"
				bind:value={option.lang}
				on:change={() => {
					generatedPhrase = '';
					hangulConverted = '';
					generatedPhrase = generatePassphrase(option);
				}}
			>
				<option value="en">English</option>
				<option value="ko">한국어</option>
			</select>
		</div>
		{#if option.lang == 'en'}
			<div class="flex flex-row">
				<label for="wordset-size" class="my-auto">Wordset</label>
				<select
					name="wordset-size"
					class="ml-auto w-48 p-2"
					id="worset-size-select"
					bind:value={option.wordset}
					on:change={() => {
						generatedPhrase = generatePassphrase(option);
					}}
				>
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
			</div>
		{/if}
		<div class="wrap flex flex-col gap-4 md:flex-row md:gap-0">
			<label for="wordcount" class="my-auto">Number of words</label>
			<input
				class="mr-auto ml-auto w-5/6 md:mr-0 md:ml-auto md:w-1/2"
				type="range"
				name="wordcount"
				id="wordcount-input"
				max="16"
				min="3"
				bind:value={option.wordcount}
				on:change={() => {
					generatedPhrase = generatePassphrase(option);
				}}
			/>
			<span class="m-auto md:mr-0 md:ml-8">{option.wordcount} words</span>
		</div>
		<div class="flex flex-row">
			<label for="separator" class="my-auto">Separator</label>
			<select
				name="separator"
				class="ml-auto p-2"
				id="separator-select"
				bind:value={option.separator}
				on:change={() => {
					generatedPhrase = changeSeparator(option);
				}}
			>
				<option value="">None</option>
				<option value=".">.</option>
				<option value=",">,</option>
				<option value=";">;</option>
				<option value="/">/</option>
				<option value="-">-</option>
				<option value="_">_</option>
				<option value="~">~</option>
				<option value="`">`</option>
				<option value="@">@</option>
				<option value="#">#</option>
				<option value="$">$</option>
				<option value="%">%</option>
				<option value="^">^</option>
				<option value="&">&</option>
				<option value="*">*</option>
				<option value="(">(</option>
				<option value=")">)</option>
			</select>
		</div>
		<div class="flex flex-row">
			<label for="include-number" class="my-auto">Include number?</label>
			<input
				type="checkbox"
				name="include-number"
				class="ml-auto p-2"
				id="include-number-cb"
				bind:checked={option.useNumber}
				on:change={() => {
					generatedPhrase = generatePassphrase(option);
				}}
			/>
		</div>

		<div class="flex flex-row">
			<button
				class="m-auto h-12 w-full rounded-lg bg-blue-700 p-2 text-white"
				on:click={() => {
					generatedPhrase = generatePassphrase(option);
				}}>Generate New Passphrase</button
			>
		</div>
		{#if generatedStory != '' || loadingGeneration}
			<div class="flex w-full flex-col gap-6">
				<div class="flex flex-col border px-4 py-4 shadow-md">
					<h2 class="pb-6 font-serif text-sm italic">AI says...</h2>
					<div class="flex flex-col flex-wrap pb-6">
						{#if loadingGeneration}
							<div class="mx-auto">
								<Spinner></Spinner>
							</div>
						{:else}
							<p class="text-center font-serif text-xl italic">{generatedStory}</p>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<div class="m-auto flex w-full flex-row">
			<div class="mx-auto flex flex-col">
				<Turnstile
					bind:reset
					class="mx-auto"
					siteKey="0x4AAAAAAAegoSKCA6LvLU2r"
					theme="auto"
					appearance="always"
					size="normal"
					on:callback={(t) => {
						cfToken = t.detail.token;
					}}
				></Turnstile>
			</div>
		</div>
		<div class="flex flex-row">
			<button
				on:click={handleGenerationRequest}
				disabled={loadingGeneration}
				class="m-auto h-12 w-full rounded-lg bg-green-800 p-2 text-white">{buttonText}</button
			>
		</div>
	</div>

	<div class="flex flex-col gap-4 border p-6">
		<h2 class="font-bold">Important Notice</h2>
		<p class="text-center font-bold">USING AI FEATURE COMPROMISES THE GENERATED PASSPHRASE</p>

		<p class="text-justify">
			AI generation is powered by Google Gemini 2.5 Flash <span class="italic">free tier</span>,
			which means that
			<span class="font-bold"
				>all your passphrases, after you click the AI button, will be sent to and used by Google to
				enhance their products.</span
			>
		</p>
		<p class="text-justify">
			For security, passphrases generated here are created locally using <span
				class="bg-black p-1 font-mono text-white">crpyto.getRandomValues()</span
			>. You can safely use generated passphrase, as long as you don't use LLM functionality.
		</p>
		<p class="text-justify">
			Remember that while many companies aim to respect user privacy, Google's terms explicitly
			state that your data may be used for product improvements. For sensitive or production-related
			passphrases, we advise using a trusted, offline method.
		</p>
	</div>
</div>
