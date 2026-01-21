import { generateTextFromAudio } from "backend/speech-to-text";
import { getGeminiResponse } from "backend/IA";



$w.onReady(function () {
  // Evento de grabación de audio
  $w("#audioRecorder1").onSave(async (event) => {
    const { url } = event.data;
    console.log("URL del audio grabado:", url);
    await askQuestion(url);
  });

  // Evento del botón para obtener la respuesta de Gemini
  $w("#button11").onClick(async () => {
    const conversationText = $w("#textBox1").value; // Obtener el mensaje desde #textBox1
    console.log("Prompt para Gemini:", conversationText);

    const promptMessage = `Categoriza el perfil del paciente, el estado de ánimo, el motivo de consulta y posibles alternativas de ayuda. No narres ni uses la tercera persona, solo enfócate en el paciente (estado de ánimo, qué le pasó, puntos clave de la reunión…). No utilices bullet points con temas específicos. Imagina que eres un terapeuta tomando notas de la sesión. : ${conversationText}`;

    try {
      // Invocar la función getGeminiResponse
      const geminiResponse = await getGeminiResponse(promptMessage);
      console.log("Respuesta de Gemini:", geminiResponse);

      // Poner la respuesta en otro campo de texto
      $w("#textBox2").value = geminiResponse; // Aquí la respuesta se pone en #textBox2
    } catch (error) {
      console.error("Error al obtener respuesta de Gemini:", error);
      $w("#textBox2").value = "Error al obtener respuesta.";
    }
  });
});

async function askQuestion(audioUrl) {
  // Cambiar el valor del campo mientras se transcribe
  $w("#textBox1").value = "Transcribiendo...";

  try {
    // Verificar la URL antes de llamarlo
    console.log("Iniciando la transcripción para la URL:", audioUrl);
    
    const transcription = await generateTextFromAudio(audioUrl);
    console.log(1)
    // Verificar el resultado de la transcripción
    console.log("Transcripción generada:", transcription);
    console.log(2)
    // Mostrar la transcripción en el input
    $w("#textBox1").value = transcription;


    
  } catch (error) {
    // Mostrar errores si ocurren
    console.error("Error al transcribir:", error);

    // Mostrar el error en el campo de entrada
    $w("#textBox1").value = "Error al transcribir el audio.";
  }
}


