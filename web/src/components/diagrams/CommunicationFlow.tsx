'use client';
import { motion } from 'framer-motion';
import { Shield, Monitor, Server, Lock, ArrowRight } from 'lucide-react';

export function CommunicationFlow() {
  return (
    <div className="w-full h-full relative py-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#80808020_50%,transparent_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,#ffffff10_50%,transparent_100%)]" />
      
      {/* Flow Steps */}
      <div className="relative max-w-2xl mx-auto">
        {/* Step 1: Initial Authentication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-medium mb-1">Initial Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Secure handshake using mTLS certificates
            </p>
          </div>
          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowRight className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>

        {/* Step 2: Tunnel Setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-medium mb-1">Secure Tunnel Establishment</h3>
            <p className="text-sm text-muted-foreground">
              Encrypted communication channel setup
            </p>
          </div>
          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <ArrowRight className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>

        {/* Data Flow Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative p-6 rounded-lg border border-border bg-card"
        >
          <div className="flex justify-between items-center gap-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Monitor className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              <p className="text-xs font-medium">Agent</p>
            </div>

            <div className="flex-grow relative h-2">
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 bg-primary rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Server className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              <p className="text-xs font-medium">Server</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <motion.p
              className="text-xs text-muted-foreground"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Encrypted Data Transfer
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 