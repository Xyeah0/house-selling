import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useMemo, useRef, useState } from "react";
import { uploadPropertyImage } from "../../lib/storage";

const MAX_IMAGES = 9;

interface PropertyImagesUploadProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
  client: SupabaseClient | null;
}

function urlsToFileList(urls: string[]): UploadFile[] {
  return urls.map((url, index) => ({
    uid: `img-${index}-${url}`,
    name: `image-${index + 1}.jpg`,
    status: "done" as const,
    url,
    thumbUrl: url,
  }));
}

export function PropertyImagesUpload({ value = [], onChange, client }: PropertyImagesUploadProps) {
  const [uploadingCount, setUploadingCount] = useState(0);
  const urls = value ?? [];
  const urlsRef = useRef(urls);
  urlsRef.current = urls;

  const fileList = useMemo(() => urlsToFileList(urls), [urls]);

  const doUpload = async (file: File) => {
    if (!client) {
      message.warning("请先连接 Supabase");
      return;
    }

    if (urlsRef.current.length >= MAX_IMAGES) {
      message.warning(`最多上传 ${MAX_IMAGES} 张图片`);
      return;
    }

    setUploadingCount((n) => n + 1);
    try {
      const { url, error } = await uploadPropertyImage(client, file);
      if (error) {
        message.error(error);
        return;
      }
      if (url) {
        onChange?.([...urlsRef.current, url]);
        message.success("图片已上传");
      }
    } catch (e) {
      message.error(e instanceof Error ? e.message : "上传失败");
    } finally {
      setUploadingCount((n) => n - 1);
    }
  };

  const handleRemove = (file: UploadFile) => {
    onChange?.(urls.filter((url) => url !== file.url));
    return true;
  };

  return (
    <Upload
      accept="image/*"
      listType="picture-card"
      fileList={fileList}
      multiple
      beforeUpload={(file) => {
        void doUpload(file);
        return false;
      }}
      onRemove={handleRemove}
      showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
    >
      {fileList.length >= MAX_IMAGES ? null : (
        <button type="button" className="admin-upload-trigger">
          <PlusOutlined />
          <div>{uploadingCount > 0 ? "上传中…" : "上传图片"}</div>
        </button>
      )}
    </Upload>
  );
}

export { MAX_IMAGES };
