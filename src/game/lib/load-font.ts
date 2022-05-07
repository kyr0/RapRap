export const loadFont = async(name: string, url: string) => {
    const newFont = new FontFace(name, `url(${url})`);
    try {
        const loadedFont: FontFace = await newFont.load();
        (document as any).fonts.add(loadedFont);
    } catch(e) {
        console.error(e)
    }
}