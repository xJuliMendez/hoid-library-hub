<script setup lang="ts">
import { useFileSystemAccess } from '@vueuse/core'
import fs from 'fs'
import JSZip from 'jszip';

const dataType = ref('Text') as Ref<'Text' | 'ArrayBuffer' | 'Blob'>
const fileSystem = useFileSystemAccess({
	dataType,
	types: [{
		description: 'Text Files',
		accept: {
			// 'text/plain': ['.txt', '.html'],
			// 'application/json': ['.json'],
			'image/*': ['.png', '.gif', '.jpg', '.jpeg'],
			// 'application/pdf': ['.pdf'],
			// 'application/epub+zip': ['.epub'],
			// 'application/zip': ['.zip'],
			'text/plain': ['.txt'],
		},
	}],
	excludeAcceptAllOption: true,
})




async function onSave() {
	await fileSystem.save()
}

const file = ref<File | null>(null)

const onChangeFile = (e: Event) => {
	const [_file] = (e.target as HTMLInputElement).files as FileList
	
	file.value = _file
}

async function onOpen() {



	// console.log(fileSystem.data.value);
	

	// const zip = new JSZip()

	// const result = await zip.loadAsync(fileSystem.data.value)

	// const files = Object.keys(result.files)
	// console.log(files);
	
}

async function onSubmit() {
	if (!file.value) 
		return 

	const form = new FormData()
	form.append('file', file.value)

	$fetch(
		'api/epub',
		{
			method: 'POST',
			body: form,
		}
	)
}
</script>
<template>
	<div>
		<h1>uploadasdasdas</h1>
		<div>
			<input type="file" @change="onChangeFile">
			<button @click="onSubmit">
				subir sosio
			</button>
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
	</div>
</template>