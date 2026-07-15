"use client";

import {
  HiOutlinePhoto,
  HiOutlineVideoCamera,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiPaperAirplane,
  HiPencil,
  HiXMark,
} from "react-icons/hi2";
import Avatar from "@/components/ui/Avatar";
import { currentUser } from "@/lib/data";
import { useState, useRef } from "react";
import { Modal, Input, Select, message } from "antd";
import { fetcherWithTokenPostFormData } from "@/api-services/api";

const { TextArea } = Input;

const attachments = [
  { icon: HiOutlinePhoto, label: "Photo" },
  { icon: HiOutlineVideoCamera, label: "Video" },
  { icon: HiOutlineCalendarDays, label: "Event" },
  { icon: HiOutlineDocumentText, label: "Article" },
];

export default function CreatePost({ mutate }: { mutate: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setIsModalOpen(true);

  const resetForm = () => {
    setText("");
    setVisibility("PUBLIC");
    setImageFile(null);
    setImagePreview(null);
  };

  const closeModal = () => {
    if (isPosting) return;
    setIsModalOpen(false);
    resetForm();
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Please select a valid image file");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePost = async () => {
    if (!text.trim() && !imageFile) {
      message.warning("Write something or add an image");
      return;
    }

    try {
      setIsPosting(true);

      const formData = new FormData();
      formData.append("text", text);
      formData.append("visibility", visibility);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetcherWithTokenPostFormData("/post/create", formData);

      message.success("Post created successfully");
      closeModal();

      mutate();
    } catch (error) {
      console.error(error);
      message.error("Failed to create post, please try again");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <>
      <div className="mb-4 rounded-2xl border border-border-subtle bg-surface p-4">
        <div className="flex items-center gap-3">
          <Avatar src={currentUser.avatar} alt={currentUser.name} size={40} />
          <button
            onClick={openModal}
            className="flex-1 rounded-full bg-muted px-4 py-2.5 text-left text-sm text-secondary hover:bg-border-subtle/60"
          >
            Write something ...
          </button>
          <HiPencil
            onClick={openModal}
            className="hidden h-4 w-4 shrink-0 cursor-pointer text-secondary sm:block"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
          <div className="flex items-center gap-1.5">
            {attachments.map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                onClick={openModal}
                className="grid h-9 w-9 place-items-center rounded-lg text-secondary hover:bg-muted"
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            <HiPaperAirplane className="h-4 w-4" />
            Post
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        closable={!isPosting}
        title={
          <span className="text-base font-semibold text-primary">
            Create Post
          </span>
        }
      >
        <div className="flex items-center gap-3 py-2">
          <Avatar src={currentUser.avatar} alt={currentUser.name} size={40} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-primary">
              {currentUser.name}
            </span>
            <Select
              value={visibility}
              onChange={(val) => setVisibility(val)}
              size="small"
              className="w-[110px]"
              options={[
                { value: "PUBLIC", label: "🌐 Public" },
                { value: "PRIVATE", label: "🔒 Private" },
              ]}
            />
          </div>
        </div>

        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          autoSize={{ minRows: 4, maxRows: 8 }}
          className="!border-0 !shadow-none !text-base focus:!ring-0"
          disabled={isPosting}
        />

        {imagePreview && (
          <div className="relative mt-3 overflow-hidden rounded-xl border border-border-subtle">
            <img
              src={imagePreview}
              alt="preview"
              className="max-h-80 w-full object-cover"
            />
            <button
              onClick={removeImage}
              disabled={isPosting}
              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <div className="mt-4 flex items-center justify-between rounded-xl border border-border-subtle p-3">
          <span className="text-sm font-medium text-secondary">
            Add to your post
          </span>
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Photo"
              onClick={handleImageClick}
              disabled={isPosting}
              className="grid h-9 w-9 place-items-center rounded-lg text-green-600 hover:bg-muted"
            >
              <HiOutlinePhoto className="h-5 w-5" />
            </button>
            <button
              aria-label="Video"
              disabled={isPosting}
              className="grid h-9 w-9 place-items-center rounded-lg text-red-500 hover:bg-muted"
            >
              <HiOutlineVideoCamera className="h-5 w-5" />
            </button>
            <button
              aria-label="Event"
              disabled={isPosting}
              className="grid h-9 w-9 place-items-center rounded-lg text-blue-500 hover:bg-muted"
            >
              <HiOutlineCalendarDays className="h-5 w-5" />
            </button>
            <button
              aria-label="Article"
              disabled={isPosting}
              className="grid h-9 w-9 place-items-center rounded-lg text-orange-500 hover:bg-muted"
            >
              <HiOutlineDocumentText className="h-5 w-5" />
            </button>
          </div>
        </div>

        <button
          onClick={handlePost}
          disabled={isPosting || (!text.trim() && !imageFile)}
          className="cursor-pointer mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <HiPaperAirplane className="h-4 w-4" />
          {isPosting ? "Posting..." : "Post"}
        </button>
      </Modal>
    </>
  );
}
