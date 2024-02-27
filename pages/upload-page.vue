<script setup lang="ts">
import { useFileSystemAccess } from '@vueuse/core'

const dataType = ref('Text') as Ref<'Text' | 'ArrayBuffer' | 'Blob'>
const fileSystem = useFileSystemAccess({
	dataType,
	types: [{
		description: 'Blob',
		accept: {
			'text/plain': ['.txt', '.html'],
			'application/json': ['.json'],
			'image/*': ['.png', '.gif', '.jpg', '.jpeg'],
			'application/pdf': ['.pdf'],
			'application/epub+zip': ['.epub'],

		},
	}],
	excludeAcceptAllOption: true,
})



const pdfBlob = ref<Blob | null>(null)

async function onSave() {
	await fileSystem.save()
}

const url = ref<string | null>(null)

async function onOpen() {
	await fileSystem.open()

	const blob = new Blob([fileSystem.data.value], { type: 'application/pdf' })

	url.value = URL.createObjectURL(blob)


}
</script>
<template>
	<div>
		<h1>uploadasdasdas</h1>
		<div>
			<button @click="onOpen">
				Open
			</button>
			<button @click="fileSystem.updateData()">
				Upload
			</button>
			<button>
				Download
			</button>
			<button @click="onSave">
				Save
			</button>
		</div>
		<div v-if="url">
			<embed :src="url" width="100%" height="500px">
		</div>
	</div>
</template>