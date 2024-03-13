// import utils from "@strapi/utils";
// import os from "os";
// import * as fse from "fs-extra";
// import * as stream from "stream";
// import path from "path";
// import axios from "axios";
//
// export default ({ strapi }) => {
//   /**
//    * Asynchronously upload a buffer to the media library.
//    * @see https://github.com/strapi/strapi/pull/15755
//    *
//    * @param {Object} params - The parameters for uploading the buffer.
//    * @param {Buffer} params.file - The buffer to be uploaded.
//    * @param {string} params.fileName - The name of the file to be uploaded.
//    * @param {number} [params.folder] - The folder to upload the file to.
//    * @param {string} params.mime - The MIME type of the file.
//    * @param {string} params.ext - The file extension.
//    * @param {string} [params.alternativeText] - The alternative text for the file.
//    * @param {string} [params.caption] - The caption for the file.
//    *
//    * @throws {utils.errors.ApplicationError} If `mime`, `ext`, `file`, or `fileName` is undefined.
//    *
//    * @returns {Promise<Object>} The uploaded file entity.
//    */
//   async function uploadFileBuffer({ file, fileName, folder, mime, ext, alternativeText, caption }) {
//     if (!mime) {
//       throw new utils.errors.ApplicationError("mime type is undefined");
//     }
//     if (!ext) {
//       throw new utils.Errors.ApplicationError("ext is undefined");
//     }
//     if (!file) {
//       throw new utils.Errors.ApplicationError("file is undefined");
//     }
//     if (!fileName) {
//       throw new utils.Errors.ApplicationError("fileName is undefined");
//     }
//
//     const config = strapi.config.get("plugin.upload");
//     const uploadService = strapi.services["plugin::upload.upload"];
//
//     const randomSuffix = () => crypto.randomBytes(5).toString("hex");
//     const generateFileName = (name) => {
//       const baseName = utils.nameToSlug(name, { separator: "_", lowercase: false });
//
//       return `${baseName}_${randomSuffix()}`;
//     };
//     const createAndAssignTmpWorkingDirectoryToFiles = async (files) => {
//       const tmpWorkingDirectory = await fse.mkdtemp(path.join(os.tmpdir(), "strapi-upload-"));
//
//       if (Array.isArray(files)) {
//         files.forEach((file) => {
//           file.tmpWorkingDirectory = tmpWorkingDirectory;
//         });
//       } else {
//         files.tmpWorkingDirectory = tmpWorkingDirectory;
//       }
//
//       return tmpWorkingDirectory;
//     };
//
//     const entity = {
//       name: `${fileName}${ext}`,
//       hash: generateFileName(fileName),
//       ext,
//       mime,
//       size: utils.file.bytesToKbytes(Number(file.length)),
//       provider: config.provider,
//       folder,
//       caption,
//       alternativeText,
//       tmpWorkingDirectory: await createAndAssignTmpWorkingDirectoryToFiles({}),
//       getStream() {
//         return stream.Readable.from(file);
//       },
//     };
//
//     await uploadService.uploadImage(entity);
//
//     return strapi.query("plugin::upload.file").create({ data: entity });
//   }
//
// };
