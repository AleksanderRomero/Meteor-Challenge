const Jimp = require("jimp");

async function analyzeImage(imagePath) {
    // Carregar a imagem
    const image = await Jimp.read(imagePath);

    const width = image.bitmap.width;
    const height = image.bitmap.height;

    let starCount = 0;
    let meteorCount = 0;
    let meteorsOnWaterCount = 0;

    let groundLine = null;
    let waterLine = null;

    // Percorrer cada pixel da imagem
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));

            if (r === 255 && g === 255 && b === 255) {
                // Pixel branco - Estrela
                starCount++;
            } else if (r === 255 && g === 0 && b === 0) {
                // Pixel vermelho - Meteoro
                meteorCount++;

                // Verificar se o meteoro está acima da linha da água
                if (waterLine !== null && y < waterLine) {
                    meteorsOnWaterCount++;
                }
            } else if (r === 0 && g === 0 && b === 255) {
                // Pixel azul - Água
                if (waterLine === null) {
                    waterLine = y;
                }
            } else if (r === 0 && g === 0 && b === 0) {
                // Pixel preto - Chão
                if (groundLine === null) {
                    groundLine = y;
                }
            }
        }
    }

    // Recalcular os meteoros que caem na água
    if (waterLine !== null && groundLine !== null) {
        meteorsOnWaterCount = 0;
        for (let x = 0; x < width; x++) {
            let meteorInColumn = false;
            for (let y = 0; y < groundLine; y++) {
                const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));

                if (r === 255 && g === 0 && b === 0) {
                    // Pixel vermelho - Meteoro
                    meteorInColumn = true;
                } else if (r === 0 && g === 0 && b === 255) {
                    // Pixel azul - Água
                    if (meteorInColumn) {
                        meteorsOnWaterCount++;
                    }
                    break;
                }
            }
        }
    }

    return { starCount, meteorCount, meteorsOnWaterCount };
}

// Caminho para a imagem do desafio
const imagePath = "./img/meteor_challenge_01.png";

// Analisar a imagem
analyzeImage(imagePath)
    .then(({ starCount, meteorCount, meteorsOnWaterCount }) => {
        console.log("Número de Estrelas:", starCount);
        console.log("Número de Meteoros:", meteorCount);
        console.log("Meteoros caindo na Água:", meteorsOnWaterCount);
    })
    .catch((err) => {
        console.error("Erro ao analisar a imagem:", err);
    });
