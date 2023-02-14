<template>
  <div>
    <div v-if="editor" class="row bg-primary rounded">
      <div
        class="col btn_width"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="editor.isActive('bold') ? 'text-warning' : 'text-white'"
        title="bold"
      >
        <&nbsp;b&nbsp;>
      </div>
      <div
        class="col btn_width"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="editor.isActive('italic') ? 'text-warning' : 'text-white'"
        title="italic"
      >
        <&nbsp;i&nbsp;>
      </div>
      <!-- <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="editor.isActive('strike') ? 'text-warning':'text-white'"
        title="strike"
      >
        strike
      </div>
      <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="editor.isActive('code') ? 'text-warning':'text-white'"
        title="code"
      >
        code
      </div>
      <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().unsetAllMarks().run()"
        title="marks"
      >
        clear marks
      </div>
      <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().clearNodes().run()"
        title="clear nodes"
      >
        clear nodes
      </div> -->
      <div
        class="col btn_width"
        @click="editor.chain().focus().setParagraph().run()"
        :class="editor.isActive('paragraph') ? 'text-warning' : 'text-white'"
        title="paragraph"
      >
        <&nbsp;p&nbsp;>
      </div>
      <!-- <div
        class="col  btn_width"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="editor.isActive('heading', { level: 1 }) ? 'text-warning' : 'text-white'"
        title="h1"
      >
        h1
      </div>
      <div
        class="col  btn_width"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="editor.isActive('heading', { level: 2 }) ? 'text-warning' : 'text-white'"
        title="h2"
      >
        h2
      </div>
      <div
        class="col  btn_width"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="editor.isActive('heading', { level: 3 }) ? 'text-warning' : 'text-white'"
        title="h3"
      >
        h3
      </div>
      <div
        class="col  btn_width"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="editor.isActive('heading', { level: 4 }) ? 'text-warning' : 'text-white'"
        title="h4"
      >
        h4
      </div>
      <div
        class="col  btn_width"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="editor.isActive('heading', { level: 5 }) ? 'text-warning' : 'text-white'"
        title="h5"
      >
        h5
      </div>
      <div
        class="col  btn_width"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="editor.isActive('heading', { level: 6 }) ? 'text-warning' : 'text-white'"
        title="h6"
      >
        h6
      </div> -->
      <div
        class="col btn_width"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="editor.isActive('bulletList') ? 'text-warning' : 'text-white'"
        title="list"
      >
        <&nbsp;li&nbsp;>
      </div>
      <div
        class="col btn_width"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="editor.isActive('orderedList') ? 'text-warning' : 'text-white'"
        title="ordered list"
      >
        <&nbsp;ol&nbsp;>
      </div>
      <!-- <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="editor.isActive('codeBlock') ? 'text-warning':'text-white'"
        title="code block"
      >
        code block
      </div>
      <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="editor.isActive('blockquote') ? 'text-warning':'text-white'"
        title="blockquote"
      >
        blockquote
      </div>
      <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().setHorizontalRule().run()"
        title="horizontal rule"
      >
        horizontal rule
      </div>
      <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().setHardBreak().run()"
        title="hard break"
      >
        hard break
      </div>
      <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        title="undo"
      >
        undo
      </div>
      <div
        class="col btn btn-primary btn_width"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        title="redo"
      >
        redo
      </div> -->
    </div>
    <editor-content :editor="editor" class="mt-2 textarea_box" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      attributes: {
        class: 'textarea_box',
      },
      content: this.value,
      extensions: [StarterKit],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML());
        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
.btn_width {
  cursor: pointer;
  margin: 3px;
  padding: 3px;
  border-radius: 3px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.textarea_box {
  border: 1.5px solid #878787 !important;
  border-radius: 4px;
  padding: 4px;
}
</style>
