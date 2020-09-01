import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { ToastServiceProvider } from '../toast-service/toast-service';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { ConfigProvider } from '../config/config';
import { File } from '@ionic-native/file';
/*
  Generated class for the CameraServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraServiceProvider {

 

  constructor(private camera: Camera,
    private toastService: ToastServiceProvider,
    private transfer: Transfer,
    private file: File) {

  }

   

  /**
    * 使用cordova-plugin-camera获取照片的base64
    * @return {Promise<T>}
    */
  getPicture(options: {}) {
    return new Promise((resolve, reject) => {
      this.camera.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
        destinationType: this.camera.DestinationType.FILE_URI,//返回值格式,DATA_URL:base64,FILE_URI:图片路径
        quality: 70,//保存的图像质量，范围为0 - 100
        allowEdit: true,//选择图片前是否允许编辑
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 1000,//缩放图像的宽度（像素）
        targetHeight: 1000,//缩放图像的高度（像素）
        saveToPhotoAlbum: false,//是否保存到相册
        correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
      }, options)).then((imageData) => {
        resolve(imageData);
      }, (err) => {
        console.log(err);
        err == 20 ? this.toastService.showToast('没有权限,请在设置中开启权限') : reject(err);
      });
    });
  }


  /**
     * 通过图库获取照片
     * @param allow 是否多选,默认为单选
     * @return {Promise<T>}
     */
  getPictureByPhotoLibrary(allow: boolean = false): Promise<any> {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }, { allowEdit: allow })).then(imageBase64 => {
        resolve(imageBase64);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.toastService.showToast('取消选择图片') : this.toastService.showToast('获取照片失败');
      });
    });
  }

  /**
     * 上存文件
     * @param name 文件名称
     * @param param 上传参数
     * @param fileUrl 文件路径
     * @param url 上传路径
     * @return {Promise<T>}
     */
    uploadFile(param: any, fileUrl: string, url: string) {
      if (!!!!fileUrl) {
          const fileTransfer: TransferObject  = this.transfer.create();
          let options: FileUploadOptions = {
              fileKey: 'file',
              params: { data: param },
              headers: {}
          }
          return new Promise((resolve) => {
              fileTransfer.upload(fileUrl, ConfigProvider.API_URL + url, options).then((data) => {
                  // success
                  resolve(data);
              }).catch(err => {
                  this.toastService.showToast('上存失败');
              });
          });
      } else {
          this.toastService.showToast('上传文件不能为空');
          return new Promise((resolve) => {
              resolve();
          });
      }
  }

  /**
       * 根据图片绝对路径转化为base64字符串
       * @param url 绝对路径
       * @param callback 回调函数
       */
      convertImgToBase64(url: string, callback) {
        this.getFileContentAsBase64(url, function (base64Image) {
            callback.call(this, base64Image.substring(base64Image.indexOf(';base64,') + 8));
        })
    }

    private getFileContentAsBase64(path: string, callback) {
      function fail(err) {
          console.log('Cannot found requested file' + err);
      }

      function gotFile(fileEntry) {
          fileEntry.file(function (file) {
              let reader = new FileReader();
              reader.onloadend = function (e) {
                  let content = this.result;
                  callback(content);
              };
              reader.readAsDataURL(file);
          });
      }

      this.file.resolveLocalFilesystemUrl(path).then(fileEnter => gotFile(fileEnter)).catch(err => fail(err));
      // window['resolveLocalFileSystemURL'](path, gotFile, fail);
  }

  /**
   * 下載圖片
   * @param url 
   * @param name 
   */
  download(url,name): Promise<any>{

    const fileTransfer: TransferObject = this.transfer.create();
    console.log(this.file)
    return fileTransfer.download(encodeURI(url), this.file.dataDirectory  + name).then(res=>{
      alert(res.toURL());
      (<any>window).galleryRefresh.refresh(
        res.nativeURL,
        function(success){ console.log(success); },
        function(error){ console.log(error); }
      );
    });
  }

}
