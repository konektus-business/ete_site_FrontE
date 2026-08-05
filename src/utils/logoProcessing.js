// utils/logoProcessing.js

const MAX_HEIGHT = 48;
const MAX_WIDTH = 160;

/**
 * Redimensionne l'image à un gabarit fixe (comme orange.png/ooredoo.png)
 * en conservant le ratio, et retourne un dataURL PNG.
 * removeBackground: tente de rendre transparent le fond uni détecté aux coins.
 */
export const processLogoFile = (file, { removeBackground = false } = {}) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Lecture du fichier échouée'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Image invalide'));
      img.onload = () => {
        try {
          const ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height, 1);
          const w = Math.round(img.width * ratio);
          const h = Math.round(img.height * ratio);

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          if (removeBackground) {
            stripUniformBackground(ctx, w, h);
          }

          resolve(canvas.toDataURL('image/png'));
        } catch (err) {
          reject(err);
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
};

// Chroma key basique : échantillonne les 4 coins, si leur couleur est proche
// (fond uni type blanc/couleur unie), on rend transparent tout pixel proche
// de cette couleur. Fonctionne bien pour logos avec fond uni simple,
// échoue sur fonds dégradés/complexes (limite connue, à annoncer à l'utilisateur).
const stripUniformBackground = (ctx, w, h) => {
  const imageData = ctx.getImageData(0, 0, w, h);
  const { data } = imageData;

  const corners = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
  ];
  const samples = corners.map(([x, y]) => {
    const i = (y * w + x) * 4;
    return [data[i], data[i + 1], data[i + 2]];
  });

  // On ne tente la suppression que si les 4 coins sont bien de couleur similaire
  // (sinon ce n'est probablement pas un fond uni simple, on laisse tel quel)
  const isUniform = samples.every(([r, g, b]) =>
    samples.every(([r2, g2, b2]) =>
      Math.abs(r - r2) < 15 && Math.abs(g - g2) < 15 && Math.abs(b - b2) < 15
    )
  );
  if (!isUniform) return;

  const [tr, tg, tb] = samples[0];
  const tolerance = 30;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (Math.abs(r - tr) < tolerance && Math.abs(g - tg) < tolerance && Math.abs(b - tb) < tolerance) {
      data[i + 3] = 0; // alpha à 0 = transparent
    }
  }
  ctx.putImageData(imageData, 0, 0);
};