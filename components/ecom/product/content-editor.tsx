'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_TOOLS } from './editor-tools';

const ContentEditor = () => {
	const ref = useRef<EditorJS>();

	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true);
		}
	}, []);
	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;

		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'content-editor',
				onReady() {
					ref.current = editor;
				},
				placeholder: 'Type here to write details...',
				inlineToolbar: true,
				data: { blocks: [] },
				tools: EDITOR_TOOLS,
			});
		}
	}, []);
	useEffect(() => {
		const init = async () => {
			await initializeEditor();
			setTimeout(() => {});
		};
		if (isMounted) {
			init();
			return () => {};
		}
	}, [isMounted]);

	// useEffect(() => {
	// 	//initialize editor if we don't have a reference
	// 	if (!ref.current) {
	// 		const editor = new EditorJS({
	// 			holder: 'content-editor',
	// 			tools: EDITOR_TOOLS,
	// 			data,
	// 			async onChange(api, event) {
	// 				const data = await api.saver.save();
	// 				onChange(data);
	// 			},
	// 		});
	// 		ref.current = editor;
	// 	}

	// 	//add a return function handle cleanup
	// 	return () => {
	// 		if (ref.current && ref.current.destroy) {
	// 			ref.current.destroy();
	// 		}
	// 	};
	// }, []);

	return <div id="content-editor" className="prose max-w-full" />;
};

export default ContentEditor;
