'use client'
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { useTransition } from "react";



export const DeleteConfirmationModal = ({ mode, action, title }:
   { mode: 'Expand' | 'Icon', action: any, title: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransation] = useTransition();

  async function callDeleteAction() {
    startTransation(() => {
      action();
      setIsOpen(false);
    });
  }

  return (
    <>
      <Button className="gap-2" color="danger" isIconOnly={mode==='Icon'} size="sm" variant="ghost" onPress={() => setIsOpen(true)}>
        {mode === 'Expand' ? (
          <>
            <Icon className="text-default-500" icon="lucide:trash-2" />
            <span className="text-default-500">Delete</span>
          </>
        )
          : (
            <Icon className="text-default-500" icon="lucide:trash-2" />
          )
        }

      </Button>
      <Modal isOpen={isOpen} size="md" onOpenChange={() => setIsOpen(!isOpen)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-danger/10">
                    <Icon className="text-xl text-danger" icon="lucide:alert-triangle" />
                  </div>
                  <span className="text-lg">Confirm Delete</span>
                </div>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <p>Are you sure you want to delete this {title}?</p>
                <p className="text-small text-default-500">This action cannot be undone.</p>
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Button color="default" isDisabled={isPending}  variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" isLoading={isPending}  onPress={ callDeleteAction }>
                  Delete {title}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  );
};
