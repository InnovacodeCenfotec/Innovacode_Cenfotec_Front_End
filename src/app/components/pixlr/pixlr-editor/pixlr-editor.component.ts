import { Component, ElementRef, ViewChild } from '@angular/core';
import { Editor } from '@pixlrlte/pixlr-sdk';


@Component({
  selector: 'app-pixlr-editor',
  standalone: true,
  imports: [],
  templateUrl: './pixlr-editor.component.html',
  template: `
        <iframe #editorFrame id="pixlr-editor" style="width:100%; height:500px;"></iframe>
        <input type="file" (change)="onFileSelect($event)" />
    `,
  styleUrl: './pixlr-editor.component.scss'
})
export class PixlrEditorComponent {
  @ViewChild('iframe') iframe!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  editor: Editor | undefined;

  async ngAfterViewInit() {
    // Access  iframe and file input elements after view initialization
    const frame = this.iframe.nativeElement;
    const fileInput = this.fileInput.nativeElement;

    // Listen for file input changes
    fileInput.addEventListener('change', async (event: any) => {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0]; // Use the first file

        if (!this.editor) {
          // Connect to  Pixlr editor
          this.editor = await Editor.connect('your-jwt-token', frame, {
            baseUrl: "https://pixlr.com" // Optional: Custom base URL for  editor
        });
        }

        // Open  file in the editor
        for await (const newFile of this.editor.open(file)) {
          // Handle  updated file, e.g., displaying edited image on your page
        }
      }
    });
  }

}
