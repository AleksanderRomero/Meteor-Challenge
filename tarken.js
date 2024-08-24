const Jimp = require("jimp");

async function analyzeImage(imagePath) {
    // Carregar a imagem
    const image = await Jimp.read(imagePath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    let starCount = 0;
    let meteorCount = 0;
    let meteorsOnWaterCount = 0;

    // Percorrer a imagem e verificar cada pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));

            // Contagem de Estrelas
            if (r === 255 && g === 255 && b === 255) {
                // Estrela (branco)
                starCount++;
            }

            // Contagem de Meteoros
            if (r === 255 && g === 0 && b === 0) {
                // Meteoro (vermelho)
                meteorCount++;

                // Verificar se o meteoro vai cair na água
                let meteorInColumn = true;
                for (let yCheck = y + 1; yCheck < height; yCheck++) {
                    const {
                        r: rCheck,
                        g: gCheck,
                        b: bCheck,
                    } = Jimp.intToRGBA(image.getPixelColor(x, yCheck));

                    if (rCheck === 0 && gCheck === 0 && bCheck === 0) {
                        // Montanha (preto)
                        meteorInColumn = false; // Meteoro bloqueado por uma montanha
                        break;
                    } else if (rCheck === 0 && gCheck === 0 && bCheck === 255) {
                        // Água (azul)
                        if (meteorInColumn) {
                            meteorsOnWaterCount++;
                            break;
                        }
                    }
                }
            }
        }
    }

    return { starCount, meteorCount, meteorsOnWaterCount };
}

// Caminho para a imagem do desafio
const imagePath = "img/meteor_challenge_01.png";

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
