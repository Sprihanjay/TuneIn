import gradio as gr


# connect ai with this function
def process(prompt):
    return prompt


demo = gr.Interface(
    fn=process,
    inputs=["text"],
    outputs=["text"],
)

demo.launch(share=True)
