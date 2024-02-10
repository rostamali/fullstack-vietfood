'use client';
import React, { useCallback, useEffect, useRef, useState, FC } from 'react';
import type EditorJS from '@editorjs/editorjs';
import { uploadEditorImage } from '@/lib/actions/editor.action';
type EditorProps = {
	editorStyle?: string;
	value: any;
	onChange: React.Dispatch<React.SetStateAction<any>>;
};

const ContentEditor: FC<EditorProps> = ({ editorStyle, onChange, value }) => {
	const ref = useRef<EditorJS>();
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true);
		}
	}, []);
	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		const Embed = (await import('@editorjs/embed')).default;
		const Table = (await import('@editorjs/table')).default;
		const List = (await import('@editorjs/list')).default;
		const Code = (await import('@editorjs/code')).default;
		const InlineCode = (await import('@editorjs/inline-code')).default;
		const ImageTool = (await import('@editorjs/image')).default;
		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'content-editor',
				onReady() {
					ref.current = editor;
				},
				placeholder: 'Type here to write details...',
				inlineToolbar: true,
				data: { ...value },
				tools: {
					header: Header,
					image: {
						class: ImageTool,
						config: {
							uploader: {
								async uploadByFile(file: File) {
									const formData = new FormData();
									formData.append('files', file);
									const result = await uploadEditorImage(
										formData,
									);
									return {
										success: 1,
										file: {
											url: result.url ? result.url : null,
										},
									};
								},
							},
						},
					},
					list: List,
					code: Code,
					inlineCode: InlineCode,
					table: Table,
					embed: Embed,
				},
				async onChange(api, event) {
					const data = await api.saver.save();
					onChange(data);
				},
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
			return () => {
				if (ref.current && ref.current.destroy) {
					ref.current.destroy();
					ref.current = undefined;
				}
			};
		}
	}, [isMounted, initializeEditor]);

	return (
		<div
			id="content-editor"
			className={`${
				editorStyle
					? editorStyle
					: 'border-light rounded-md bg-white py-3'
			}`}
		/>
	);
};

export default ContentEditor;
